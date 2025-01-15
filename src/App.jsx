import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    language: '',
    attachment: null,
    gender: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(''); 

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value) error = 'Please enter your name!';
        break;
      case 'email':
        if (!value) error = 'Please enter an email!';
        else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format!';
        break;
      case 'password':
        if (!value) error = 'Please enter a password!';
        else if (value.length < 8) error = 'Password must be at least 8 characters!';
        else {
          const strength = getPasswordStrength(value);
          setPasswordStrength(strength);
        }
        break;
      case 'confirmPassword':
        if (!value) error = 'Please confirm your password!';
        else if (value !== formData.password) error = 'Passwords do not match!';
        break;
      case 'mobile':
        if (!value) error = 'Please enter your mobile number!';
        else if (!/^(?:\+256|0)[7][0-9]{8}$/.test(value)) error = 'Invalid mobile number format!';
        break;
      case 'language':
        if (!value) error = 'Please select your language!';
        break;
      case 'attachment':
        if (!value) error = 'Please select a valid file!';
        break;
      case 'gender':
        if (!value) error = 'You must select a gender!';
        break;
      case 'termsAccepted':
        if (!value) error = 'You must accept the terms of use!';
        break;
      default:
        break;
    }
    return error;
  };

  
  const getPasswordStrength = (password) => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})");
    const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
    if (strongRegex.test(password)) return 'Strong';
    if (mediumRegex.test(password)) return 'Medium';
    return 'Weak';
  };

  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const fieldValue = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    const error = validateField(name, fieldValue);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    
    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = Object.keys(formData).reduce((acc, field) => {
      const error = validateField(field, formData[field]);
      if (error) acc[field] = error;
      return acc;
    }, {});

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted successfully!', formData);
      alert('You have been successfully registered!');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        language: '',
        attachment: null,
        gender: '',
        termsAccepted: false,
      });
      setErrors({});
      setPasswordStrength('');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="registration-form">
      <h1>Registration Form</h1>
      <form className="form" onSubmit={handleSubmit}>
        
        
        <div className="form-grid">
          
          {/* Left Column */}
          <div className="column">
            <div className="form-group">
              <label htmlFor="name"><b>Name:</b></label><br />
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="email"><b>Email:</b></label><br />
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password"><b>Password:</b></label><br />
              <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
              {errors.password && <p className="error">{errors.password}</p>}
              <p className={`password-strength ${passwordStrength.toLowerCase()}`}>Strength: {passwordStrength}</p>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword"><b>Confirm Password:</b></label><br />
              <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Right Column */}
          <div className="column">
            
            <div className="form-group">
              <label htmlFor="mobile"><b>Mobile number:</b></label><br />
              <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} />
              {errors.mobile && <p className="error">{errors.mobile}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="language"><b>Language:</b></label><br />
              <select name="language" id="language" value={formData.language} onChange={handleChange}>
                <option value="">Select Language</option>
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="luganda">Luganda</option>
              </select>
              {errors.language && <p className="error">{errors.language}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="attachment"><b>Attachment (JPG, PNG, PDF or ZIP):</b></label><br />
              <input type="file" id="attachment" name="attachment" accept=".jpg, .jpeg, .png, .pdf, .zip" onChange={handleChange} />
              {errors.attachment && <p className="error">{errors.attachment}</p>}
            </div>
            
            <div className="gender-group">
              <label><b>Gender:</b></label>
              <div>
                <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} /> Male</label>
                <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} /> Female</label>
              </div>
              {errors.gender && <p className="error">{errors.gender}</p>}
            </div>
            
            <div className="form-group terms">
              <label htmlFor="termsAccepted">
                <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                I accept the <a href="/" target="_blank">Terms of Use</a>.
              </label>
              {errors.termsAccepted && <p className="error">{errors.termsAccepted}</p>}
            </div>
            
            <button type="submit" className='register-button'>Register Now</button>
          
          </div>
        </div>
      </form>
    
    </div>
  );
}

export default App;
