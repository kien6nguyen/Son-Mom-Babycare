/**
 * Database Abstraction Layer
 * --------------------------
 * Tự động switch giữa:
 *   - Local PostgreSQL (Docker) khi DB_MODE=local
 *   - Supabase khi DB_MODE=supabase
 *
 * Cung cấp API thống nhất cho tất cả routes.
 */

import pool from '../config/database.js';
import { supabase } from '../config/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

const isLocal = () => {
  const mode = process.env.DB_MODE || 'local';
  return mode === 'local';
};

const getSupabase = () => {
  if (!supabase) {
    throw new Error('Supabase client chưa được cấu hình. Vui lòng cung cấp SUPABASE_URL và SUPABASE_SERVICE_ROLE_KEY trong file .env');
  }
  return supabase;
};

const db = {
  /**
   * Lấy danh sách records
   * @param {string} table - Tên bảng
   * @param {object} options - { where, orderBy, orderDir, limit, offset, count }
   */
  async findAll(table, options = {}) {
    const { where = {}, orderBy = 'created_at', orderDir = 'DESC', limit, offset } = options;

    if (isLocal()) {
      // --- PostgreSQL local (Docker) ---
      const conditions = [];
      const values = [];
      let paramIdx = 1;

      for (const [key, val] of Object.entries(where)) {
        conditions.push(`${key} = $${paramIdx}`);
        values.push(val);
        paramIdx++;
      }

      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      let query = `SELECT * FROM ${table} ${whereClause} ORDER BY ${orderBy} ${orderDir}`;

      if (limit) {
        query += ` LIMIT $${paramIdx}`;
        values.push(limit);
        paramIdx++;
      }
      if (offset !== undefined) {
        query += ` OFFSET $${paramIdx}`;
        values.push(offset);
        paramIdx++;
      }

      const result = await pool.query(query, values);

      // Đếm total nếu cần (cho phân trang)
      let total = null;
      if (options.count) {
        const countQuery = `SELECT COUNT(*) FROM ${table} ${whereClause}`;
        const countResult = await pool.query(countQuery, Object.values(where));
        total = parseInt(countResult.rows[0].count);
      }

      return { data: result.rows, count: total };
    } else {
      // --- Supabase ---
      const client = getSupabase();
      let query = client.from(table).select('*', options.count ? { count: 'exact' } : {});

      for (const [key, val] of Object.entries(where)) {
        query = query.eq(key, val);
      }

      query = query.order(orderBy, { ascending: orderDir === 'ASC' });

      if (limit && offset !== undefined) {
        query = query.range(offset, offset + limit - 1);
      } else if (limit) {
        query = query.limit(limit);
      }

      const { data, error, count } = await query;
      if (error) throw error;
      return { data, count };
    }
  },

  /**
   * Lấy 1 record theo ID
   */
  async findById(table, id) {
    if (isLocal()) {
      const result = await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]);
      return { data: result.rows[0] || null };
    } else {
      const client = getSupabase();
      const { data, error } = await client.from(table).select('*').eq('id', id).single();
      if (error && error.code !== 'PGRST116') throw error;
      return { data };
    }
  },

  /**
   * Lấy 1 record theo điều kiện
   */
  async findOne(table, where = {}) {
    if (isLocal()) {
      const conditions = [];
      const values = [];
      let idx = 1;
      for (const [key, val] of Object.entries(where)) {
        conditions.push(`${key} = $${idx}`);
        values.push(val);
        idx++;
      }
      const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
      const result = await pool.query(`SELECT * FROM ${table} ${whereClause} LIMIT 1`, values);
      return { data: result.rows[0] || null };
    } else {
      const client = getSupabase();
      let query = client.from(table).select('*');
      for (const [key, val] of Object.entries(where)) {
        query = query.eq(key, val);
      }
      const { data, error } = await query.single();
      if (error && error.code !== 'PGRST116') throw error;
      return { data };
    }
  },

  /**
   * Tạo record mới
   */
  async create(table, record) {
    if (isLocal()) {
      const keys = Object.keys(record);
      const values = Object.values(record);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      const result = await pool.query(
        `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,
        values
      );
      return { data: result.rows[0] };
    } else {
      const client = getSupabase();
      const { data, error } = await client.from(table).insert([record]).select().single();
      if (error) throw error;
      return { data };
    }
  },

  /**
   * Cập nhật record
   */
  async update(table, id, updates) {
    updates.updated_at = new Date().toISOString();

    if (isLocal()) {
      const keys = Object.keys(updates);
      const values = Object.values(updates);
      const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');
      values.push(id);
      const result = await pool.query(
        `UPDATE ${table} SET ${setClause} WHERE id = $${values.length} RETURNING *`,
        values
      );
      return { data: result.rows[0] };
    } else {
      const client = getSupabase();
      const { data, error } = await client.from(table).update(updates).eq('id', id).select().single();
      if (error) throw error;
      return { data };
    }
  },

  /**
   * Xóa record
   */
  async remove(table, id) {
    if (isLocal()) {
      await pool.query(`DELETE FROM ${table} WHERE id = $1`, [id]);
      return { success: true };
    } else {
      const client = getSupabase();
      const { error } = await client.from(table).delete().eq('id', id);
      if (error) throw error;
      return { success: true };
    }
  },

  /**
   * Raw query (chỉ dùng cho local)
   */
  async rawQuery(sql, params = []) {
    if (isLocal()) {
      const result = await pool.query(sql, params);
      return { data: result.rows };
    }
    throw new Error('rawQuery chỉ hỗ trợ cho DB_MODE=local');
  },
};

export default db;
