# Vehicle Rental Application 🚗

A full-stack vehicle rental management system showcasing enterprise-level Java EE development skills. This project demonstrates the implementation of robust software architecture, secure user authentication, and efficient database management.

## 🏆 Key Highlights

- **Enterprise Architecture**: Implemented MVC pattern for scalable and maintainable codebase
- **Security**: Robust user authentication and role-based access control
- **Database Management**: Efficient handling of complex relationships between vehicles, bookings, and users
- **User Experience**: Intuitive interface with responsive design and real-time updates
- **Business Logic**: Comprehensive implementation of rental management workflows

## 🛠️ Technical Skills Demonstrated

- **Backend Development**
  - Java EE
  - MVC Architecture
  - Database Design & Management
  - RESTful API Design
  - Log4j for Logging

- **Frontend Development**
  - JSP (JavaServer Pages)
  - CSS Styling
  - Responsive Design
  - Form Validation
  - User Interface Design

- **Software Engineering**
  - Object-Oriented Programming
  - Design Patterns
  - Code Organization
  - Version Control
  - Documentation

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── keane/
│   │           ├── mvc/         # MVC components
│   │           ├── dbfw/        # Database framework
│   │           ├── dbcon/       # Database connection
│   │           └── training/    # Business logic
│   └── webapp/
│       ├── pages/              # JSP pages and static resources
│       │   ├── images/        # Image assets
│       │   ├── *.jsp          # JSP pages
│       │   └── *.css          # Stylesheets
│       ├── WEB-INF/           # Web application configuration
│       └── META-INF/          # Application metadata
```

## 💡 Key Features

### User Features
- Secure User Registration and Login System
- Real-time Vehicle Availability Checking
- Streamlined Booking Process
- Comprehensive Booking History
- Dynamic Discount Management
- Interactive Feedback System
- Real-time Vehicle Status Updates

### Admin Features
- Secure Admin Authentication
- Complete Vehicle Management System
- Dynamic Availability Control
- Advanced Discount Management
- Comprehensive User Management
- Detailed Booking Analytics
- Customer Feedback Management
- Customer Account Management

## 🚀 Technical Implementation

### Architecture
- **Frontend**: JSP, CSS
- **Backend**: Java EE
- **Database**: (Database type to be specified)
- **Framework**: Custom MVC Framework
- **Logging**: Log4j
- **Security**: Role-based Access Control

### Key Components
- Custom MVC Framework Implementation
- Database Connection Pooling
- Session Management
- Form Validation
- Error Handling
- Logging System

## 📋 Setup Instructions

1. Ensure you have Java EE development environment set up
2. Configure the database connection in `src/main/java/com/keane/dbcon/`
3. Deploy the application to a Java EE compatible server
4. Access the application through the web browser

## ⚙️ Configuration

- Log4j configuration is available in `src/main/java/log4j.properties`
- Database connection settings should be configured in the appropriate properties file

## 📱 Application Pages

### User Interface
- `index.jsp` - Modern landing page
- `UserLogin.jsp` - Secure login interface
- `UserRegister.jsp` - User registration system
- `UserHome.jsp` - Interactive dashboard
- `UserAvailableVehicle.jsp` - Real-time vehicle listing
- `UserAllBookedVehicles.jsp` - Booking management
- `UserViewDiscounts.jsp` - Dynamic discount system
- `UserFeedback.jsp` - User feedback interface
- `UserBookingConfirmation.jsp` - Booking confirmation system

### Admin Interface
- `AdminLogin.jsp` - Secure admin authentication
- `Adminhome.jsp` - Administrative dashboard
- `AdminAddVehicle.jsp` - Vehicle management
- `AdminAddCustomer.jsp` - Customer management
- `AdminAddDiscount.jsp` - Discount management
- `AdminUpdateDiscount.jsp` - Dynamic discount updates
- `AdminRemoveVehicle.jsp` - Vehicle removal system

### Analytics & Management
- `AllVehiclesDetails.jsp` - Complete vehicle inventory
- `AllUserDetails.jsp` - User management system
- `AllBookingDetails.jsp` - Booking analytics
- `AllFeedbackDetails.jsp` - Feedback management
- `AllDiscountDetails.jsp` - Discount analytics

## 🤝 Contributing

This project welcomes contributions! Please follow the existing code structure and patterns when contributing.

## 📄 License

[License information to be added]

---
*Built with ❤️ using Java EE technologies* 