import { useCallback, useEffect, useState } from 'react';
import {
  BookOpen,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  Package,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import './Admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const resources = [
  {
    key: 'services',
    label: 'Dịch vụ',
    endpoint: '/services',
    icon: LayoutDashboard,
    title: 'title',
    fields: [
      { name: 'title', label: 'Tên dịch vụ', required: true },
      { name: 'description', label: 'Mô tả', type: 'textarea', wide: true },
      { name: 'icon', label: 'Biểu tượng' },
      { name: 'image', label: 'URL hình ảnh', wide: true },
      { name: 'sort_order', label: 'Thứ tự', type: 'number' },
      { name: 'is_active', label: 'Đang hiển thị', type: 'checkbox' },
    ],
  },
  {
    key: 'treatments',
    label: 'Liệu trình',
    endpoint: '/treatments',
    icon: ClipboardList,
    title: 'title',
    fields: [
      { name: 'title', label: 'Tên liệu trình', required: true },
      { name: 'description', label: 'Mô tả', type: 'textarea', wide: true },
      { name: 'duration', label: 'Thời lượng' },
      { name: 'sessions', label: 'Số buổi' },
      { name: 'highlights', label: 'Điểm nổi bật (mỗi dòng một mục)', type: 'list', wide: true },
      { name: 'image', label: 'URL hình ảnh', wide: true },
      { name: 'popular', label: 'Liệu trình phổ biến', type: 'checkbox' },
      { name: 'is_active', label: 'Đang hiển thị', type: 'checkbox' },
    ],
  },
  {
    key: 'pricing',
    label: 'Gói dịch vụ',
    endpoint: '/pricing',
    icon: Package,
    title: 'name',
    fields: [
      { name: 'name', label: 'Tên gói', required: true },
      { name: 'price', label: 'Giá', type: 'number', required: true },
      { name: 'unit', label: 'Đơn vị giá' },
      { name: 'description', label: 'Mô tả', type: 'textarea', wide: true },
      { name: 'features', label: 'Quyền lợi (mỗi dòng một mục)', type: 'list', wide: true },
      { name: 'not_included', label: 'Không bao gồm (mỗi dòng một mục)', type: 'list', wide: true },
      { name: 'color', label: 'Màu sắc' },
      { name: 'highlight', label: 'Gói nổi bật', type: 'checkbox' },
      { name: 'is_active', label: 'Đang hiển thị', type: 'checkbox' },
    ],
  },
  {
    key: 'blogs',
    label: 'Bài viết',
    endpoint: '/blogs',
    icon: BookOpen,
    title: 'title',
    fields: [
      { name: 'title', label: 'Tiêu đề', required: true, wide: true },
      { name: 'slug', label: 'Slug', required: true },
      { name: 'category', label: 'Danh mục' },
      { name: 'author', label: 'Tác giả' },
      { name: 'excerpt', label: 'Mô tả ngắn', type: 'textarea', wide: true },
      { name: 'content', label: 'Nội dung', type: 'textarea', wide: true },
      { name: 'image', label: 'URL hình ảnh', wide: true },
      { name: 'read_time', label: 'Thời gian đọc' },
      { name: 'published', label: 'Xuất bản', type: 'checkbox' },
    ],
  },
];

const contactStatuses = [
  { value: 'new', label: 'Mới' },
  { value: 'contacted', label: 'Đã liên hệ' },
  { value: 'in_progress', label: 'Đang xử lý' },
  { value: 'completed', label: 'Hoàn tất' },
  { value: 'cancelled', label: 'Đã hủy' },
];

const emptyValue = (field) => {
  if (field.type === 'checkbox') return field.name === 'is_active';
  if (field.type === 'list') return [];
  return '';
};

const createForm = (resource, record) => Object.fromEntries(
  resource.fields.map((field) => {
    const value = record?.[field.name];
    if (field.type === 'list') {
      const listValue = Array.isArray(value) ? value : [];
      return [field.name, listValue.join('\n')];
    }
    return [field.name, value ?? emptyValue(field)];
  }),
);

const createPayload = (resource, form) => Object.fromEntries(
  resource.fields.map((field) => {
    let value = form[field.name];
    if (field.type === 'number') value = value === '' ? null : Number(value);
    if (field.type === 'list') {
      value = value.split('\n').map((item) => item.trim()).filter(Boolean);
    }
    return [field.name, value];
  }),
);

const getRecordTitle = (resource, record) => record[resource.title] || 'Chưa có tiêu đề';

const formatDate = (value) => {
  if (!value) return '—';
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'medium' }).format(new Date(value));
};

const Admin = () => {
  const [adminKey, setAdminKey] = useState(() => sessionStorage.getItem('sonAdminKey') || '');
  const [loginKey, setLoginKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [activeKey, setActiveKey] = useState('services');
  const [records, setRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [editor, setEditor] = useState(null);
  const [form, setForm] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeResource = resources.find((resource) => resource.key === activeKey);
  const isContacts = activeKey === 'contacts';

  const verifyAdminKey = useCallback(async (key) => {
    const response = await fetch(`${API_URL}/admin/verify`, {
      headers: { 'x-admin-key': key },
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) {
      throw new Error(result.message || 'Không thể xác thực mã quản trị.');
    }
  }, []);

  useEffect(() => {
    if (!adminKey) return;
    verifyAdminKey(adminKey)
      .then(() => setIsAuthenticated(true))
      .catch(() => {
        sessionStorage.removeItem('sonAdminKey');
        setAdminKey('');
      });
  }, [adminKey, verifyAdminKey]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsVerifying(true);
    setLoginError('');
    try {
      await verifyAdminKey(loginKey);
      sessionStorage.setItem('sonAdminKey', loginKey);
      setAdminKey(loginKey);
      setIsAuthenticated(true);
      setLoginKey('');
    } catch (authError) {
      setLoginError(authError.message || 'Không thể xác thực mã quản trị.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('sonAdminKey');
    setAdminKey('');
    setIsAuthenticated(false);
    setRecords([]);
  };

  const loadRecords = useCallback(async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    setError('');
    try {
      const endpoint = isContacts
        ? '/contact'
        : `${activeResource.endpoint}${activeKey === 'blogs' ? '?includeUnpublished=true&limit=1000' : ''}`;
      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: { 'x-admin-key': adminKey },
      });
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Không thể tải dữ liệu.');
      }
      setRecords(Array.isArray(result.data) ? result.data : []);
    } catch (loadError) {
      setError(loadError.message || 'Không thể kết nối API. Hãy kiểm tra backend và thử tải lại.');
      setRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, [activeKey, activeResource, adminKey, isAuthenticated, isContacts]);

  useEffect(() => {
    if (isAuthenticated) loadRecords();
  }, [loadRecords]);

  const selectResource = (key) => {
    setActiveKey(key);
    setIsMenuOpen(false);
    setNotice('');
  };

  const openEditor = (record = null) => {
    setEditor(record || {});
    setForm(createForm(activeResource, record));
    setError('');
    setNotice('');
  };

  const closeEditor = () => {
    if (isSaving) return;
    setEditor(null);
  };

  const saveRecord = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError('');

    try {
      const isEditing = Boolean(editor?.id);
      const response = await fetch(
        `${API_URL}${activeResource.endpoint}${isEditing ? `/${editor.id}` : ''}`,
        {
          method: isEditing ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
          body: JSON.stringify(createPayload(activeResource, form)),
        },
      );
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Không thể lưu dữ liệu.');
      }
      setEditor(null);
      setNotice(isEditing ? 'Đã cập nhật nội dung.' : 'Đã tạo nội dung mới.');
      await loadRecords();
    } catch (saveError) {
      setError(saveError.message || 'Không thể lưu dữ liệu.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteRecord = async (record) => {
    if (!window.confirm(`Bạn có chắc muốn xóa “${getRecordTitle(activeResource, record)}”?`)) return;

    setError('');
    setNotice('');
    try {
      const response = await fetch(`${API_URL}${activeResource.endpoint}/${record.id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': adminKey },
      });
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Không thể xóa nội dung.');
      }
      setNotice('Đã xóa nội dung.');
      await loadRecords();
    } catch (deleteError) {
      setError(deleteError.message || 'Không thể xóa nội dung.');
    }
  };

  const updateContactStatus = async (id, status) => {
    setError('');
    setNotice('');
    try {
      const response = await fetch(`${API_URL}/contact/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Không thể cập nhật trạng thái liên hệ.');
      }
      setRecords((current) => current.map((record) => (
        record.id === id ? { ...record, status: result.data?.status || status } : record
      )));
      setNotice('Đã cập nhật trạng thái liên hệ.');
    } catch (updateError) {
      setError(updateError.message || 'Không thể cập nhật trạng thái liên hệ.');
    }
  };

  const renderField = (field) => (
    <label
      className={`admin__field ${field.wide ? 'admin__field--wide' : ''} ${
        field.type === 'checkbox' ? 'admin__field--checkbox' : ''
      }`}
      key={field.name}
    >
      {field.type === 'checkbox' ? (
        <>
          <input
            type="checkbox"
            checked={Boolean(form[field.name])}
            onChange={(event) => setForm((current) => ({
              ...current,
              [field.name]: event.target.checked,
            }))}
          />
          <span>{field.label}</span>
        </>
      ) : (
        <>
          <span className="admin__field-label">{field.label}{field.required ? ' *' : ''}</span>
          {field.type === 'textarea' || field.type === 'list' ? (
            <textarea
              required={field.required}
              rows={field.type === 'list' ? 5 : 4}
              value={form[field.name] ?? ''}
              onChange={(event) => setForm((current) => ({
                ...current,
                [field.name]: event.target.value,
              }))}
            />
          ) : (
            <input
              type={field.type === 'number' ? 'number' : 'text'}
              min={field.type === 'number' ? 0 : undefined}
              required={field.required}
              value={form[field.name] ?? ''}
              onChange={(event) => setForm((current) => ({
                ...current,
                [field.name]: event.target.value,
              }))}
            />
          )}
        </>
      )}
    </label>
  );

  if (!isAuthenticated) {
    return (
      <main className="admin-login">
        <form className="admin-login__card" onSubmit={handleLogin}>
          <a className="admin__brand" href="/">
            <span className="admin__brand-mark">SÕN</span>
            <span className="admin__brand-caption">QUẢN TRỊ</span>
          </a>
          <span className="admin__eyebrow">KHU VỰC QUẢN TRỊ</span>
          <h1>Đăng nhập quản trị</h1>
          <p>Nhập khóa quản trị đã cấu hình trong backend để tiếp tục.</p>
          <label className="admin__field">
            <span className="admin__field-label">Khóa quản trị</span>
            <input
              type="password"
              autoComplete="current-password"
              value={loginKey}
              onChange={(event) => setLoginKey(event.target.value)}
              required
            />
          </label>
          {loginError && <div className="admin__alert admin__alert--error" role="alert">{loginError}</div>}
          <button className="admin__primary-button" type="submit" disabled={isVerifying}>
            {isVerifying ? 'Đang xác minh…' : 'Đăng nhập'}
          </button>
          <a className="admin-login__back" href="/">← Quay lại trang chủ</a>
        </form>
      </main>
    );
  }

  return (
    <div className="admin">
      <aside className={`admin__sidebar ${isMenuOpen ? 'admin__sidebar--open' : ''}`}>
        <a className="admin__brand" href="/">
          <span className="admin__brand-mark">SÕN</span>
          <span className="admin__brand-caption">QUẢN TRỊ</span>
        </a>

        <div className="admin__nav-label">QUẢN LÝ NỘI DUNG</div>
        <nav className="admin__nav" aria-label="Điều hướng quản trị">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <button
                className={`admin__nav-item ${activeKey === resource.key ? 'admin__nav-item--active' : ''}`}
                key={resource.key}
                onClick={() => selectResource(resource.key)}
              >
                <Icon size={18} />
                <span>{resource.label}</span>
              </button>
            );
          })}
          <button
            className={`admin__nav-item ${isContacts ? 'admin__nav-item--active' : ''}`}
            onClick={() => selectResource('contacts')}
          >
            <FileText size={18} />
            <span>Liên hệ</span>
          </button>
        </nav>
        <a href="/" className="admin__back-link">← Quay lại trang chủ</a>
      </aside>

      {isMenuOpen && (
        <button
          className="admin__overlay"
          aria-label="Đóng menu"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <main className="admin__main">
        <header className="admin__topbar">
          <button
            className="admin__menu-toggle"
            aria-label="Mở menu"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={21} />
          </button>
          <div className="admin__breadcrumb">SÕN <span>/</span> Quản trị</div>
          <div className="admin__topbar-actions">
            <a className="admin__site-link" href="/">Xem website ↗</a>
            <button className="admin__logout-button" onClick={handleLogout}>Đăng xuất</button>
          </div>
        </header>

        <section className="admin__content">
          <div className="admin__page-heading">
            <div>
              <span className="admin__eyebrow">BẢNG ĐIỀU KHIỂN</span>
              <h1>{isContacts ? 'Yêu cầu liên hệ' : `Quản lý ${activeResource.label.toLowerCase()}`}</h1>
              <p>
                {isContacts
                  ? 'Xem yêu cầu tư vấn và cập nhật trạng thái xử lý.'
                  : `Thêm, chỉnh sửa hoặc xóa ${activeResource.label.toLowerCase()} trên website.`}
              </p>
            </div>
            {!isContacts && (
              <button className="admin__primary-button" onClick={() => openEditor()}>
                <Plus size={18} /> Thêm mới
              </button>
            )}
          </div>

          <div className="admin__toolbar">
            <span>{records.length} mục</span>
            <button className="admin__refresh-button" onClick={loadRecords} disabled={isLoading}>
              <RefreshCw size={16} className={isLoading ? 'admin__spin' : ''} />
              Làm mới
            </button>
          </div>

          {error && <div className="admin__alert admin__alert--error" role="alert">{error}</div>}
          {notice && <div className="admin__alert admin__alert--success" role="status">{notice}</div>}

          <div className="admin__table-wrap">
            {isLoading ? (
              <div className="admin__empty">Đang tải dữ liệu…</div>
            ) : records.length === 0 ? (
              <div className="admin__empty">Chưa có dữ liệu. Hãy thử tải lại hoặc tạo mục mới.</div>
            ) : isContacts ? (
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>Khách hàng</th>
                    <th>Thông tin liên hệ</th>
                    <th>Dịch vụ</th>
                    <th>Lời nhắn</th>
                    <th>Ngày gửi</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td className="admin__strong">{record.name || '—'}</td>
                      <td>
                        <a href={`tel:${record.phone}`}>{record.phone || '—'}</a>
                        {record.email && <span className="admin__subtext">{record.email}</span>}
                      </td>
                      <td>{record.service || '—'}</td>
                      <td className="admin__message-cell">{record.message || '—'}</td>
                      <td>{formatDate(record.created_at)}</td>
                      <td>
                        <select
                          className={`admin__status admin__status--${record.status || 'new'}`}
                          aria-label={`Trạng thái của ${record.name || 'khách hàng'}`}
                          value={record.status || 'new'}
                          onChange={(event) => updateContactStatus(record.id, event.target.value)}
                        >
                          {contactStatuses.map((status) => (
                            <option key={status.value} value={status.value}>{status.label}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="admin__table">
                <thead>
                  <tr>
                    <th>Nội dung</th>
                    <th>Trạng thái</th>
                    <th>Cập nhật</th>
                    <th className="admin__actions-heading">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <div className="admin__record">
                          {record.image && (
                            <img className="admin__thumbnail" src={record.image} alt="" />
                          )}
                          <div>
                            <div className="admin__strong">{getRecordTitle(activeResource, record)}</div>
                            <div className="admin__subtext">
                              {record.category || record.description || record.slug || `ID: ${record.id}`}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`admin__badge ${
                          record.published || record.is_active ? 'admin__badge--active' : ''
                        }`}>
                          {activeKey === 'blogs'
                            ? (record.published ? 'Đã xuất bản' : 'Bản nháp')
                            : (record.is_active === false ? 'Đã ẩn' : 'Đang hiển thị')}
                        </span>
                      </td>
                      <td>{formatDate(record.updated_at || record.created_at)}</td>
                      <td>
                        <div className="admin__row-actions">
                          <button
                            className="admin__icon-button"
                            aria-label={`Sửa ${getRecordTitle(activeResource, record)}`}
                            onClick={() => openEditor(record)}
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            className="admin__icon-button admin__icon-button--danger"
                            aria-label={`Xóa ${getRecordTitle(activeResource, record)}`}
                            onClick={() => deleteRecord(record)}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>

      {editor !== null && (
        <div className="admin__modal-backdrop" onMouseDown={closeEditor}>
          <section
            className="admin__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-editor-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="admin__modal-header">
              <div>
                <span className="admin__eyebrow">{editor?.id ? 'CHỈNH SỬA' : 'TẠO MỚI'}</span>
                <h2 id="admin-editor-title">{editor?.id ? 'Cập nhật nội dung' : `Thêm ${activeResource.label.toLowerCase()}`}</h2>
              </div>
              <button className="admin__icon-button" aria-label="Đóng" onClick={closeEditor}>
                <X size={20} />
              </button>
            </header>
            <form onSubmit={saveRecord}>
              {error && <div className="admin__alert admin__alert--error" role="alert">{error}</div>}
              <div className="admin__form-grid">
                {activeResource.fields.map(renderField)}
              </div>
              <footer className="admin__modal-footer">
                <button type="button" className="admin__secondary-button" onClick={closeEditor} disabled={isSaving}>
                  Hủy
                </button>
                <button type="submit" className="admin__primary-button" disabled={isSaving}>
                  <Save size={17} /> {isSaving ? 'Đang lưu…' : 'Lưu thay đổi'}
                </button>
              </footer>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default Admin;
