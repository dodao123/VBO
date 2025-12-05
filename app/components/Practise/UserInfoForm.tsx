// app/components/Practise/UserInfoForm.tsx
'use client';

import { useState } from 'react';

interface UserInfoFormProps {
  onSubmit: (userId: string) => void;
  scaleType: 'GQ6_CHILD' | 'AGS12_TEEN' | 'ADULT_DHARMA';
}

export default function UserInfoForm({ onSubmit, scaleType }: UserInfoFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error khi user bắt đầu sửa
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validate tên (bắt buộc)
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Vui lòng nhập họ tên';
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Tên phải có ít nhất 2 ký tự';
    }

    // Validate số điện thoại (không bắt buộc nhưng nếu có thì phải đúng định dạng)
    if (formData.phone && !/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }

    // Validate email (không bắt buộc nhưng nếu có thì phải đúng định dạng)
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    // Validate tuổi nếu có
    if (formData.age && (parseInt(formData.age) < 1 || parseInt(formData.age) > 120)) {
      newErrors.age = 'Tuổi không hợp lệ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/gratitude/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name.trim(),
          phone: formData.phone.trim() || undefined,
          email: formData.email.trim() || undefined,
          age: formData.age ? parseInt(formData.age) : undefined,
          gender: formData.gender || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Callback với userId (không lưu localStorage để mỗi lần làm bài đều phải nhập mới)
        onSubmit(data.data.id);
      } else {
        alert('Có lỗi xảy ra: ' + data.error);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error submitting user info:', err);
      alert('Không thể lưu thông tin. Vui lòng thử lại!');
      setLoading(false);
    }
  };

  const getTitle = () => {
    switch (scaleType) {
      case 'GQ6_CHILD':
        return '🧒 Thông tin bé';
      case 'AGS12_TEEN':
        return '🎓 Thông tin của bạn';
      case 'ADULT_DHARMA':
        return '🙏 Thông tin đạo hữu';
      default:
        return 'Thông tin của bạn';
    }
  };

  const getColorScheme = () => {
    switch (scaleType) {
      case 'GQ6_CHILD':
        return 'blue';
      case 'AGS12_TEEN':
        return 'purple';
      case 'ADULT_DHARMA':
        return 'orange';
      default:
        return 'gray';
    }
  };

  const color = getColorScheme();

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <div className="text-center mb-6">
        <h2 className={`text-3xl font-bold text-${color}-600 mb-2`}>
          {getTitle()}
        </h2>
        <p className="text-gray-600">
          Vui lòng điền thông tin trước khi bắt đầu làm bài
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Họ tên - Bắt buộc */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Nhập họ tên đầy đủ..."
            className={`w-full px-4 text-gray-800  py-3 border-2 text-gray-800 rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.full_name
                ? 'border-red-300 focus:ring-red-200'
                : `border-gray-300 focus:ring-${color}-200 focus:border-${color}-400`
            }`}
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Số điện thoại
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="0912345678"
            className={`w-full px-4 text-gray-800  py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.phone
                ? 'border-red-300 focus:ring-red-200'
                : `border-gray-300 focus:ring-${color}-200 focus:border-${color}-400`
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className={`w-full px-4 text-gray-800  py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition ${
              errors.email
                ? 'border-red-300 focus:ring-red-200'
                : `border-gray-300 focus:ring-${color}-200 focus:border-${color}-400`
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Row: Tuổi và Giới tính */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Tuổi */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tuổi
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="25"
              min="1"
              max="120"
              className={`w-full px-4 text-gray-800  py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition ${
                errors.age
                  ? 'border-red-300 focus:ring-red-200'
                  : `border-gray-300 focus:ring-${color}-200 focus:border-${color}-400`
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">{errors.age}</p>
            )}
          </div>

          {/* Giới tính */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Giới tính
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 text-gray-800  py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition border-gray-300 focus:ring-${color}-200 focus:border-${color}-400`}
            >
              <option value="">Chọn giới tính</option>
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
              <option value="other">Khác</option>
            </select>
          </div>
        </div>

        {/* Note */}
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <p className="flex items-start">
            <span className="mr-2">ℹ️</span>
            <span>
              Thông tin của bạn được bảo mật và chỉ dùng cho mục đích nghiên cứu.
              Chỉ có <strong>Họ tên</strong> là bắt buộc.
            </span>
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 rounded-lg font-bold text-lg text-white transition-all transform ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : `bg-gradient-to-r from-${color}-500 to-${color}-600 hover:from-${color}-600 hover:to-${color}-700 hover:scale-105 shadow-lg`
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Đang xử lý...
            </span>
          ) : (
            '✓ Xác nhận và Bắt đầu'
          )}
        </button>
      </form>
    </div>
  );
}

