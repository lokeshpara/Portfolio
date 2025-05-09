# ATS Optimize

A comprehensive Chrome extension and server application designed to optimize resumes and cover letters for Applicant Tracking Systems (ATS). This tool helps job seekers increase their chances of getting past automated screening systems and landing interviews.

## 🌟 Key Features

### 1. Resume Analysis
- **ATS Compatibility Score**: Get a detailed score indicating how well your resume matches ATS requirements
- **Interview Chance Assessment**: AI-powered prediction of your chances of getting an interview
- **Missing Keywords Analysis**: 
  - Identifies crucial keywords from job descriptions
  - Highlights missing skills and qualifications
  - Suggests relevant industry-specific terminology
- **Tailored Suggestions**:
  - Format optimization recommendations
  - Content improvement suggestions
  - Industry-specific best practices
- **Overall Feedback**:
  - Comprehensive strengths analysis
  - Areas for improvement
  - Actionable improvement steps

### 2. Cover Letter Analysis
- **ATS Optimization**: Ensures your cover letter is ATS-friendly
- **Content Analysis**:
  - Keyword matching with job description
  - Tone and professionalism assessment
  - Structure and formatting evaluation
- **Personalization Suggestions**:
  - Company-specific customization tips
  - Industry-relevant content recommendations
  - Impact statement improvements

### 3. Document Generation
- **AI-Powered Creation**:
  - Generates ATS-optimized resumes
  - Creates tailored cover letters
  - Incorporates industry best practices
- **Customization Options**:
  - Multiple format templates
  - Industry-specific layouts
  - Professional styling options

## 🛠️ Technical Architecture

### Server Component
```
server/
├── app.py             # Flask server implementation
└── requirements.txt   # Python dependencies
```

#### Key Technologies:
- **Backend Framework**: Flask
- **AI Integration**: OpenAI API
- **Text Processing**: NLTK
- **Document Handling**: PDF and DOCX processing
- **API Security**: CORS and authentication

### Chrome Extension
```
extension/
├── popup.html        # Extension UI
├── popup.js         # Extension logic
├── styles.css       # UI styling
├── manifest.json    # Extension configuration
├── background.js    # Service worker
├── content.js       # Content script
└── images/          # Extension icons
```

#### Key Technologies:
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Tailwind CSS
- **Chrome APIs**: Manifest V3
- **File Handling**: PDF/DOCX support

## 🚀 Setup Instructions

### Server Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up your OpenAI API key:
   ```bash
   export OPENAI_API_KEY='your-api-key-here'
   ```

5. Start the Flask server:
   ```bash
   python app.py
   ```

### Chrome Extension Setup

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked" and select the `extension` directory
4. The extension icon should appear in your Chrome toolbar

## 💡 Usage Guide

### Document Analysis

1. **Upload Documents**:
   - Upload your resume (PDF/DOC/DOCX)
   - Optionally upload your cover letter
   - Paste the job description

2. **Analysis Process**:
   - Click "Analyze" to start the process
   - Wait for AI-powered analysis
   - Review detailed feedback

3. **Review Results**:
   - Check ATS compatibility score
   - Review missing keywords
   - Implement suggested improvements

### Document Generation

1. **Input Requirements**:
   - Paste the job description
   - Provide your experience details
   - Select preferred format

2. **Generation Process**:
   - Click "Generate" to create documents
   - Wait for AI processing
   - Download generated files

3. **Customization**:
   - Review generated content
   - Make necessary adjustments
   - Save final versions

## 🔧 Development

### Local Development
- Server runs on `http://localhost:5002`
- Extension communicates via REST API
- Uses OpenAI's API for analysis

### API Endpoints
- `/api/analyze`: Document analysis
- `/api/generate`: Document generation
- `/api/test`: Health check

### Dependencies

#### Server
- Flask 2.0.1
- OpenAI 1.3.0
- NLTK 3.6.3
- Python 3.x

#### Extension
- Chrome Extension Manifest V3
- Tailwind CSS
- Modern JavaScript (ES6+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript
- Write clear commit messages
- Update documentation as needed

## 📝 License

MIT License - feel free to use and modify for your needs.

## 🔐 Security

- API keys are stored securely
- No sensitive data is stored
- All communications are encrypted
- Regular security updates

## 📞 Support

For issues and feature requests, please create an issue in the repository. 