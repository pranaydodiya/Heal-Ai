
# Python Version Compatibility Guide

## ✅ Supported Python Versions

**Fully Supported:** Python 3.8, 3.9, 3.10, 3.11, 3.12, 3.13+

All requirements have been updated to use the latest package versions that support Python 3.13+!

## What's Changed for Python 3.13+ Support

The following libraries have been updated to their latest versions with Python 3.13+ compatibility:
- **NumPy 1.26.2+** - Full Python 3.13 support
- **Pandas 2.1.4+** - Compatible with latest Python versions
- **TensorFlow 2.15.0+** - Updated build system for Python 3.13
- **Flask 3.0.0+** - Latest version with modern Python support
- **Updated build tools** - setuptools 69.0.2, wheel 0.42.0, pip 23.3.1

## Quick Setup Instructions

### 1. Check Python Version (Any version 3.8+ works!)
```bash
python --version
# Python 3.13.x ✅ Supported!
```

### 2. Create Virtual Environment
```bash
python -m venv venv
```

### 3. Activate Virtual Environment
**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

### 4. Upgrade pip
```bash
python -m pip install --upgrade pip
```

### 5. Install Requirements
```bash
pip install -r requirements.txt
```

### 6. Start the Server
```bash
python run.py
```

## Installation Options

Choose the requirements file that fits your needs:

### Basic Installation (Recommended for most users)
```bash
pip install -r requirements_basic.txt
```

### Advanced Installation (Full ML/AI features)
```bash
pip install -r requirements_advanced.txt
```

### Standard Installation
```bash
pip install -r requirements.txt
```

## Troubleshooting

### If installation fails:
1. Make sure you're using Python 3.8 or newer
2. Upgrade pip: `python -m pip install --upgrade pip`
3. Try with `--no-cache-dir`: `pip install --no-cache-dir -r requirements.txt`

### For development:
```bash
# Create fresh environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install --upgrade pip
pip install -r requirements.txt
```

## Python 3.13 Benefits

- **Improved Performance** - Faster startup and execution
- **Better Error Messages** - More helpful debugging information
- **Enhanced Security** - Latest security patches and improvements
- **Modern Language Features** - Access to newest Python capabilities

🚀 **Ready to use with Python 3.13+!**
