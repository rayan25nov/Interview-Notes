# Spring Boot Complete Interview Preparation and Learning Guide

*Last Updated: August 2026*  
*For Java Developers Preparing for Spring Boot Interviews from Beginner to Expert Level*

---

## Table of Contents

1. [Introduction and Learning Approach](#introduction-and-learning-approach)
2. [Spring Framework Fundamentals](#spring-framework-fundamentals)
3. [Spring Boot Fundamentals](#spring-boot-fundamentals)
4. [Dependency Injection and IoC Container](#dependency-injection-and-ioc-container)
5. [Configuration and Application Lifecycle](#configuration-and-application-lifecycle)
6. [REST API Development](#rest-api-development)
7. [Validation and Exception Handling](#validation-and-exception-handling)
8. [Database Integration: JDBC and JPA](#database-integration-jdbc-and-jpa)
9. [Transaction Management](#transaction-management)
10. [Spring Security](#spring-security)
11. [Testing in Spring Boot](#testing-in-spring-boot)
12. [Logging, Monitoring, and Actuator](#logging-monitoring-and-actuator)
13. [Advanced Spring Concepts](#advanced-spring-concepts)
14. [Microservices and Distributed Systems](#microservices-and-distributed-systems)
15. [Production and Deployment](#production-and-deployment)
16. [Performance Optimization and Troubleshooting](#performance-optimization-and-troubleshooting)
17. [Spring Boot Internals and Deep Dive](#spring-boot-internals-and-deep-dive)
18. [Interview Preparation](#interview-preparation)
19. [Final Knowledge Checklist](#final-knowledge-checklist)

---

## 1. Introduction and Learning Approach

### 🎯 Objective
This guide provides comprehensive Spring Boot knowledge, structured for interview preparation and practical application development. Unlike typical syllabus-style documents, this contains actual learning material with detailed explanations, examples, and interview-ready answers.

### 📊 Difficulty Classification
- **🟢 Must Know**: Core concepts every Spring Boot developer should understand
- **🟡 Should Know**: Important topics for intermediate to advanced developers
- **🟠 Advanced**: Complex topics for senior developers and architects
- **🔴 Expert**: Deep dive into internals and specialized scenarios

### 📚 Learning Structure
The guide follows a progressive learning path:
1. **Foundation**: Core Spring and Spring Boot concepts
2. **Application Development**: Building real-world applications
3. **Advanced Topics**: Scalability, security, and optimization
4. **Production Readiness**: Deployment, monitoring, troubleshooting
5. **Interview Mastery**: Questions, scenarios, and best practices

---

## 2. Spring Framework Fundamentals

### 🟢 2.1 What is Spring Framework?

#### What is it?
Spring is an open-source Java framework that provides comprehensive infrastructure support for developing Java applications. It handles the infrastructure so you can focus on business logic.

#### Why does it exist?
Before Spring, Java EE applications were complex, heavyweight, and tightly coupled. Spring was created to:
- Simplify Java EE development
- Promote loose coupling through dependency injection
- Provide a comprehensive programming and configuration model

#### What problem does it solve?
1. **Complex Configuration**: Eliminates verbose XML configuration
2. **Tight Coupling**: Promotes loose coupling through DI
3. **Boilerplate Code**: Reduces repetitive code
4. **Testing Difficulty**: Makes applications easier to test
5. **Framework Integration**: Provides integration with various frameworks

#### How does it work?
Spring works through:
1. **IoC Container**: Manages object lifecycle and dependencies
2. **Aspect-Oriented Programming**: Separates cross-cutting concerns
3. **Template Classes**: Simplifies database and messaging operations
4. **Transaction Management**: Provides declarative transaction support

#### Important Annotations/Classes
- `@Component`, `@Service`, `@Repository`, `@Controller`
- `@Autowired`, `@Qualifier`, `@Value`
- `@Configuration`, `@Bean`
- `ApplicationContext`, `BeanFactory`

#### Practical Example
```java
// Traditional Java (tightly coupled)
public class UserService {
    private UserRepository repository = new UserRepository();
    
    public User getUser(Long id) {
        return repository.findById(id);
    }
}

// Spring (loosely coupled)
@Service
public class UserService {
    private final UserRepository repository;
    
    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }
    
    public User getUser(Long id) {
        return repository.findById(id);
    }
}
```

#### Common Mistakes
1. **Circular Dependencies**: Two beans depending on each other
2. **Improper Scope Usage**: Using singleton for stateful beans
3. **Missing Annotations**: Forgetting `@Component` or `@Service`
4. **Field Injection Overuse**: Prefer constructor injection for required dependencies

#### Interview Questions
**Beginner**: What is Spring Framework and why is it popular?
**Intermediate**: Explain the core modules of Spring Framework.
**Advanced**: How does Spring achieve inversion of control?

#### Interview-Ready Answer
"Spring Framework is a comprehensive Java platform that provides infrastructure support for developing robust applications. Its popularity stems from its dependency injection mechanism that promotes loose coupling, its comprehensive ecosystem covering everything from data access to security, and its ability to simplify complex enterprise development tasks. The framework follows the 'convention over configuration' principle and provides a consistent programming model throughout the application stack."

### 🟢 2.2 Inversion of Control (IoC)

#### What is it?
IoC is a design principle where the control of object creation and lifecycle is inverted from the application to a container or framework.

#### Why does it exist?
Traditional programming has objects creating and managing their dependencies, leading to:
- Tight coupling
- Difficult testing
- Hard to reuse components
- Complex configuration

#### What problem does it solve?
1. **Decouples Components**: Objects don't create their dependencies
2. **Improves Testability**: Dependencies can be mocked easily
3. **Enhances Reusability**: Components are loosely coupled
4. **Simplifies Configuration**: Centralized dependency management

#### How does it work internally?
Spring IoC container:
1. **Reads Configuration**: XML, annotations, or Java configuration
2. **Creates Beans**: Instantiates objects with their dependencies
3. **Manages Lifecycle**: Handles initialization and destruction
4. **Resolves Dependencies**: Injects required dependencies

```java
// Traditional approach (control with the object)
public class OrderService {
    private PaymentService paymentService = new PaymentService();
}

// IoC approach (control with the container)
@Component
public class OrderService {
    private PaymentService paymentService;
    
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService; // Injected by container
    }
}
```

#### Common Real-World Use Cases
1. **Service Layer**: Business services with repository dependencies
2. **Controllers**: Web controllers with service dependencies
3. **Configuration**: External configuration injection
4. **Database Connections**: Connection pool management

#### Interview Questions
**Beginner**: What is IoC and why is it important?
**Intermediate**: How does Spring implement IoC?
**Advanced**: Compare IoC container implementations in Spring.

#### Scenario-Based Question
"Your team is building a payment processing system. How would IoC help in managing dependencies between PaymentService, NotificationService, and AuditService?"

**Answer**: "IoC would allow each service to declare its dependencies without creating them. The Spring container would inject NotificationService and AuditService into PaymentService. This makes the system more testable (we can mock dependencies), maintainable (changes to one service don't require changes to others), and flexible (we can easily swap implementations)."

### 🟢 2.3 Dependency Injection (DI)

#### What is it?
DI is the process of providing objects that an object needs (its dependencies) rather than having it construct them itself.

#### Types of Dependency Injection
1. **Constructor Injection** (Recommended)
   ```java
   @Service
   public class UserService {
       private final UserRepository repository;
       
       public UserService(UserRepository repository) {
           this.repository = repository;
       }
   }
   ```

2. **Setter Injection**
   ```java
   @Service
   public class UserService {
       private UserRepository repository;
       
       @Autowired
       public void setRepository(UserRepository repository) {
           this.repository = repository;
       }
   }
   ```

3. **Field Injection** (Use sparingly)
   ```java
   @Service
   public class UserService {
       @Autowired
       private UserRepository repository;
   }
   ```

#### Why Constructor Injection is Preferred
1. **Immutability**: Fields can be marked as `final`
2. **Null Safety**: Dependencies are guaranteed to be provided
3. **Testability**: Easy to instantiate with mocks
4. **Circular Dependency Detection**: Container detects issues early

#### How does it work internally?
Spring DI process:
1. **Bean Registration**: Beans are registered in the container
2. **Dependency Resolution**: Container identifies required dependencies
3. **Injection**: Dependencies are injected based on type/name
4. **Post-Processing**: `@PostConstruct` methods are called

#### Common Mistakes
1. **Circular Dependencies**: A → B → A
2. **Ambiguous Dependencies**: Multiple beans of same type
3. **Missing Dependencies**: No matching bean found
4. **Wrong Injection Type**: Using field injection where constructor is better

#### Comparison: Constructor vs Setter vs Field Injection
| Aspect | Constructor | Setter | Field |
|--------|------------|--------|-------|
| Immutability | Yes | No | No |
| Null Safety | High | Medium | Low |
| Testability | Excellent | Good | Poor |
| Circular Dep Detection | Early | Runtime | Runtime |
| Recommended | ✅ Preferred | ⚠️ When optional | ❌ Avoid |

#### Interview Questions
**Beginner**: What are the types of dependency injection in Spring?
**Intermediate**: Why is constructor injection preferred?
**Advanced**: How does Spring resolve circular dependencies?

#### Follow-up Questions
1. "What happens if Spring finds multiple beans of the same type?"
2. "How would you inject a specific implementation when multiple exist?"
3. "Explain `@Qualifier` vs `@Primary` annotations."

### 🟡 2.4 Spring Bean Lifecycle

#### What is it?
The lifecycle of a Spring bean from creation to destruction, managed by the IoC container.

#### Bean Lifecycle Phases
1. **Instantiation**: Bean instance is created
2. **Population**: Dependencies are injected
3. **Initialization**: Custom initialization logic
4. **Ready**: Bean is ready for use
5. **Destruction**: Cleanup before destruction

#### Lifecycle Callbacks
```java
@Component
public class LifecycleBean {
    
    @PostConstruct
    public void init() {
        // Called after dependency injection
        System.out.println("Bean initialized");
    }
    
    @PreDestroy
    public void cleanup() {
        // Called before bean destruction
        System.out.println("Bean cleanup");
    }
    
    // Implementing interfaces
    @Override
    public void afterPropertiesSet() {
        // InitializingBean interface
    }
    
    @Override
    public void destroy() {
        // DisposableBean interface
    }
}
```

#### Bean Scopes
1. **Singleton** (Default): One instance per Spring container
2. **Prototype**: New instance each time requested
3. **Request**: One instance per HTTP request
4. **Session**: One instance per HTTP session
5. **Application**: One instance per ServletContext
6. **WebSocket**: One instance per WebSocket session

#### How does it work internally?
```java
// Simplified Spring bean creation process
public Object createBean() {
    // 1. Instantiate using constructor
    Object bean = instantiateBean();
    
    // 2. Populate properties (dependency injection)
    populateBean(bean);
    
    // 3. Apply BeanPostProcessors (before initialization)
    applyBeanPostProcessorsBeforeInitialization(bean);
    
    // 4. Initialize bean (@PostConstruct, InitializingBean)
    initializeBean(bean);
    
    // 5. Apply BeanPostProcessors (after initialization)
    applyBeanPostProcessorsAfterInitialization(bean);
    
    return bean;
}
```

#### Common Mistakes
1. **Using Singleton for Stateful Beans**: Leads to thread-safety issues
2. **Ignoring Scope in Web Applications**: Using wrong scope for web beans
3. **Memory Leaks in Prototype Beans**: Not cleaning up resources
4. **Race Conditions in Initialization**: Dependency on uninitialized beans

#### Real-World Use Cases
1. **Database Connection Pools**: Singleton scope
2. **Request Processing Objects**: Request scope
3. **User Session Data**: Session scope
4. **Stateless Services**: Singleton scope

#### Interview Questions
**Intermediate**: Explain Spring bean lifecycle phases.
**Advanced**: How does Spring handle prototype beans differently from singletons?
**Expert**: What are BeanPostProcessors and how do they work?

#### Scenario-Based Question
"You're building a shopping cart application. Which bean scopes would you use for CartService, ProductService, and UserSessionService?"

**Answer**: "CartService would use Session scope since each user needs their own cart instance. ProductService would use Singleton scope as it's stateless and serves all users. UserSessionService would also use Session scope to manage user-specific session data."

---

*[This is the beginning of the comprehensive guide. The document continues with detailed coverage of all Spring Boot topics...]*


## 3. Spring Boot Fundamentals

### 🟢 3.1 What is Spring Boot?

#### What is it?
Spring Boot is an opinionated framework built on top of Spring that simplifies the development of stand-alone, production-grade Spring applications.

#### Why does it exist?
Traditional Spring applications required:
- Complex XML configuration
- Manual dependency management
- External server setup
- Boilerplate code
- Tedious deployment configuration

Spring Boot was created to provide:
1. **Auto-configuration**: Automatic setup based on classpath
2. **Standalone Applications**: Embedded servers
3. **Production-Ready Features**: Metrics, health checks, externalized configuration
4. **No Code Generation**: No XML configuration required

#### What problem does it solve?
1. **Reduces Configuration Overhead**: "Convention over configuration"
2. **Simplifies Dependency Management**: Starter POMs
3. **Eliminates Servlet Container Setup**: Embedded Tomcat/Jetty
4. **Provides Production Monitoring**: Actuator endpoints
5. **Improves Developer Productivity**: Faster project setup

#### How does it work?
Spring Boot uses:
1. **Auto-configuration**: `@EnableAutoConfiguration` scans classpath
2. **Starter Dependencies**: Pre-configured dependency sets
3. **Embedded Servers**: Tomcat, Jetty, or Undertow
4. **Externalized Configuration**: Properties/YAML files
5. **Spring Boot Application Class**: `@SpringBootApplication`

#### Key Components
```java
@SpringBootApplication  // Combination of @Configuration, @EnableAutoConfiguration, @ComponentScan
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

#### Comparison: Spring vs Spring Boot
| Aspect | Spring Framework | Spring Boot |
|--------|-----------------|-------------|
| Configuration | Manual XML/Java config | Auto-configuration |
| Embedded Server | Manual setup | Built-in (Tomcat/Jetty) |
| Dependency Management | Manual | Starter POMs |
| Deployment | WAR file to external server | Standalone JAR |
| Production Features | Manual setup | Built-in (Actuator) |
| Learning Curve | Steeper | Easier |
| Boilerplate Code | More | Less |

#### Interview Questions
**Beginner**: What is Spring Boot and how is it different from Spring?
**Intermediate**: Explain the `@SpringBootApplication` annotation.
**Advanced**: How does auto-configuration work internally?

#### Interview-Ready Answer
"Spring Boot is an opinionated framework that simplifies Spring application development by providing sensible defaults and auto-configuration. It eliminates the need for XML configuration, provides embedded servers for standalone applications, and includes production-ready features out of the box. While Spring Framework provides the core infrastructure, Spring Boot adds convenience layers that dramatically reduce setup time and boilerplate code."

### 🟢 3.2 Spring Boot Auto-Configuration

#### What is it?
Auto-configuration automatically configures Spring beans based on the libraries present in the classpath.

#### How does it work?
1. **Classpath Scanning**: Spring Boot scans for specific classes
2. **Conditional Configuration**: Uses `@Conditional` annotations
3. **Auto-configuration Classes**: Pre-defined in `spring-boot-autoconfigure`
4. **Ordering**: Configurations are applied in specific order

#### Conditional Annotations
```java
@Configuration
@ConditionalOnClass(DataSource.class)  // Only if DataSource is in classpath
@ConditionalOnMissingBean(DataSource.class)  // Only if no DataSource bean exists
@AutoConfigureAfter(JpaBaseConfiguration.class)  // Apply after this configuration
public class DataSourceAutoConfiguration {
    
    @Bean
    @ConditionalOnProperty(name = "spring.datasource.url")
    public DataSource dataSource() {
        // Auto-configure DataSource
    }
}
```

#### Auto-configuration Process
1. **Spring Boot Starts**: Loads `META-INF/spring.factories`
2. **Auto-configuration Classes**: Identified from `EnableAutoConfiguration` key
3. **Condition Evaluation**: Each `@Conditional` is evaluated
4. **Bean Registration**: Qualified configurations create beans
5. **Order Application**: Beans are registered in specific order

#### How to Customize Auto-configuration
1. **Exclude Specific Auto-configuration**
   ```java
   @SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
   ```

2. **Override with Your Own Bean**
   ```java
   @Configuration
   public class CustomDataSourceConfig {
       @Bean
       public DataSource dataSource() {
           // Your custom DataSource
       }
   }
   ```

3. **Use Configuration Properties**
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/mydb
   spring.datasource.username=root
   spring.datasource.password=secret
   ```

#### Common Auto-configuration Scenarios
1. **DataSource**: When JDBC driver is in classpath
2. **JPA**: When Hibernate is detected
3. **Web MVC**: When Spring MVC is present
4. **Security**: When Spring Security is detected
5. **Actuator**: When `spring-boot-starter-actuator` is included

#### Interview Questions
**Intermediate**: How does Spring Boot decide what to auto-configure?
**Advanced**: Explain the role of `@Conditional` annotations.
**Expert**: How would you debug auto-configuration issues?

#### Scenario-Based Question
"You add `spring-boot-starter-data-jpa` to your project but don't configure a DataSource. What happens?"

**Answer**: "Spring Boot's auto-configuration will attempt to create an in-memory H2 database DataSource since it detects JPA dependencies but no DataSource configuration. However, if we don't want an in-memory database, we should either provide database properties in `application.properties` or exclude the DataSource auto-configuration."

### 🟢 3.3 Spring Boot Starters

#### What are they?
Starters are a set of convenient dependency descriptors that you can include in your application.

#### Why do they exist?
To simplify dependency management by:
1. **Grouping Related Dependencies**: All needed libraries in one starter
2. **Ensuring Compatibility**: Version compatibility between dependencies
3. **Reducing Configuration**: Pre-configured defaults
4. **Improving Consistency**: Standard project setups

#### Common Starters
```xml
<!-- Web Application -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>

<!-- Data Access with JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>

<!-- Security -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>

<!-- Testing -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<!-- Actuator (Monitoring) -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

#### Starter Dependencies Explained
Each starter typically includes:
1. **Core Spring Dependencies**: Required framework modules
2. **Third-Party Libraries**: Compatible versions
3. **Transitive Dependencies**: All necessary dependencies
4. **Auto-configuration Classes**: Automatic setup

#### Custom Starters
You can create custom starters for:
1. **Company-Specific Libraries**: Internal frameworks
2. **Common Configurations**: Reusable configurations
3. **Integration Modules**: Third-party service integrations

```xml
<!-- Custom Starter Example -->
<dependency>
    <groupId>com.company</groupId>
    <artifactId>company-spring-boot-starter</artifactId>
    <version>1.0.0</version>
</dependency>
```

#### Interview Questions
**Beginner**: What are Spring Boot starters and why use them?
**Intermediate**: What does `spring-boot-starter-web` include?
**Advanced**: How would you create a custom starter?

#### Real-World Use Case
"You're building a microservice that needs to connect to Redis, send emails, and generate PDFs. Which starters would you use?"

**Answer**: "I would use `spring-boot-starter-data-redis` for Redis integration, `spring-boot-starter-mail` for email functionality, and possibly a custom starter or direct dependency for PDF generation. For the core application, `spring-boot-starter-web` for REST API capabilities."

### 🟡 3.4 Spring Boot Application Properties

#### What are they?
Externalized configuration in key-value format that controls Spring Boot application behavior.

#### Configuration Formats
1. **Properties File** (`application.properties`)
   ```properties
   server.port=8080
   spring.datasource.url=jdbc:mysql://localhost:3306/mydb
   logging.level.org.springframework=DEBUG
   ```

2. **YAML File** (`application.yml`)
   ```yaml
   server:
     port: 8080
   
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/mydb
   
   logging:
     level:
       org.springframework: DEBUG
   ```

#### Configuration Hierarchy
Spring Boot loads properties in this order (later sources override earlier):
1. **Default Properties**: Built into Spring Boot
2. **`@PropertySource`**: Programmatically specified
3. **Config Data** (`application.properties`/`application.yml`)
4. **Random Values**: `RandomValuePropertySource`
5. **OS Environment Variables**
6. **Java System Properties**
7. **JNDI Attributes**
8. **Servlet Context Parameters**
9. **Servlet Config Parameters**
10. **Command Line Arguments**

#### Profile-Specific Configuration
```properties
# application-dev.properties
spring.datasource.url=jdbc:h2:mem:devdb

# application-prod.properties  
spring.datasource.url=jdbc:mysql://prod-db:3306/proddb
```

Activate profile: `--spring.profiles.active=dev`

#### `@ConfigurationProperties`
Bind properties to Java objects:
```java
@ConfigurationProperties(prefix = "app")
@Data  // Lombok annotation
public class AppConfig {
    private String name;
    private int version;
    private List<String> features;
}

// application.properties
app.name=MyApplication
app.version=1
app.features[0]=feature1
app.features[1]=feature2
```

#### Common Configuration Properties
```properties
# Server Configuration
server.port=8080
server.servlet.context-path=/api

# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/db
spring.datasource.username=user
spring.datasource.password=pass
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Logging Configuration
logging.level.root=WARN
logging.level.com.myapp=DEBUG
logging.file.name=app.log

# Security Configuration
spring.security.user.name=admin
spring.security.user.password=secret
```

#### Interview Questions
**Intermediate**: Explain Spring Boot's configuration property hierarchy.
**Advanced**: How does `@ConfigurationProperties` work internally?
**Expert**: How would you manage secrets in configuration?

#### Scenario-Based Question
"You need to deploy the same application to development, staging, and production environments with different database configurations. How would you manage this?"

**Answer**: "I would use Spring profiles. Create `application-dev.properties`, `application-staging.properties`, and `application-prod.properties` files with environment-specific configurations. Use `--spring.profiles.active=dev|staging|prod` to activate the appropriate profile. For sensitive data like passwords, I'd use environment variables or a secrets management system."

### 🟢 3.5 Spring Boot Project Structure

#### Standard Structure
```
src/
├── main/
│   ├── java/
│   │   └── com/
│   │       └── example/
│   │           └── demo/
│   │               ├── Application.java          # Main class
│   │               ├── config/                   # Configuration classes
│   │               ├── controller/               # REST controllers
│   │               ├── service/                  # Business services
│   │               ├── repository/               # Data access layer
│   │               ├── model/                    # Domain objects/DTOs
│   │               └── exception/                # Custom exceptions
│   └── resources/
│       ├── static/                               # Static resources
│       ├── templates/                            # Template files
│       ├── application.properties                # Configuration
│       └── application-dev.properties            # Profile-specific config
└── test/
    └── java/
        └── com/
            └── example/
                └── demo/
                    ├── controller/               # Controller tests
                    ├── service/                  # Service tests
                    └── integration/              # Integration tests
```

#### Layered Architecture
1. **Presentation Layer**: Controllers, DTOs, validation
2. **Business Layer**: Services, business logic, transactions
3. **Persistence Layer**: Repositories, entities, data access
4. **Integration Layer**: External service clients

#### Package-by-Feature vs Package-by-Layer
```java
// Package-by-Layer (Traditional)
com.example.app.controller
com.example.app.service
com.example.app.repository

// Package-by-Feature (Recommended for modularity)
com.example.app.user
    ├── UserController.java
    ├── UserService.java
    ├── UserRepository.java
    └── User.java
    
com.example.app.product
    ├── ProductController.java
    ├── ProductService.java
    ├── ProductRepository.java
    └── Product.java
```

#### Build Tools
1. **Maven** (`pom.xml`)
   ```xml
   <project>
       <parent>
           <groupId>org.springframework.boot</groupId>
           <artifactId>spring-boot-starter-parent</artifactId>
           <version>3.2.0</version>
       </parent>
   </project>
   ```

2. **Gradle** (`build.gradle`)
   ```groovy
   plugins {
       id 'org.springframework.boot' version '3.2.0'
   }
   ```

#### Interview Questions
**Beginner**: What is the standard Spring Boot project structure?
**Intermediate**: Compare package-by-layer vs package-by-feature.
**Advanced**: How does Spring Boot's parent POM simplify dependency management?

#### Project-Based Question
"You're starting a new e-commerce application. How would you structure the Spring Boot project?"

**Answer**: "I'd start with a standard Maven/Gradle project using Spring Boot starter parent. For package structure, I'd use package-by-feature approach with modules like `user`, `product`, `order`, `payment`, and `inventory`. Each feature package would contain its controller, service, repository, and model classes. I'd also create separate packages for `config`, `security`, `exception`, and `util` for shared components."

---

## 4. Dependency Injection and IoC Container

### 🟡 4.1 Bean Scopes in Detail

#### Available Scopes
1. **Singleton** (Default)
   - One instance per Spring IoC container
   - Created when context starts (lazy-init can change this)
   - Shared across entire application
   ```java
   @Component
   @Scope("singleton")
   public class SingletonBean {
       private int counter = 0;
       
       public int increment() {
           return ++counter;  // Not thread-safe!
       }
   }
   ```

2. **Prototype**
   - New instance each time bean is requested
   - Spring doesn't manage complete lifecycle
   - Client must handle cleanup
   ```java
   @Component
   @Scope("prototype")
   public class PrototypeBean {
       private final UUID id = UUID.randomUUID();
       
       public UUID getId() {
           return id;  // Different for each injection
       }
   }
   ```

3. **Request** (Web-aware)
   - One instance per HTTP request
   - Available only in web-aware ApplicationContext
   ```java
   @Component
   @Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
   public class RequestScopedBean {
       private final String requestId = UUID.randomUUID().toString();
   }
   ```

4. **Session** (Web-aware)
   - One instance per HTTP session
   - User-specific data storage
   ```java
   @Component
   @Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
   public class UserPreferences {
       private String theme = "light";
       private String language = "en";
   }
   ```

5. **Application** (Web-aware)
   - One instance per ServletContext
   - Similar to singleton but scoped to ServletContext
   ```java
   @Component
   @Scope(value = "application", proxyMode = ScopedProxyMode.TARGET_CLASS)
   public class ApplicationStats {
       private final AtomicInteger requestCount = new AtomicInteger(0);
   }
   ```

#### Scope Proxy Modes
When injecting shorter-lived beans into longer-lived beans:
```java
@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class RequestBean {
    // Injected as proxy into singleton beans
}

@Service
public class SingletonService {
    @Autowired
    private RequestBean requestBean;  // Proxy injected
    
    public void process() {
        // Proxy delegates to actual request-scoped bean
        requestBean.doSomething();
    }
}
```

#### Common Scope Issues
1. **Thread Safety in Singletons**: Stateful singletons cause race conditions
2. **Memory Leaks in Prototypes**: Not cleaned up by Spring
3. **Scope Mismatch**: Injecting request-scoped into singleton
4. **Proxy Limitations**: Final methods can't be proxied

#### Interview Questions
**Intermediate**: When would you use prototype scope vs singleton?
**Advanced**: How does Spring handle scope injection mismatches?
**Expert**: Explain proxy modes for web-scoped beans.

#### Scenario-Based Question
"You have a ShoppingCart bean that should maintain items for each user session. Which scope would you use and why?"

**Answer**: "I would use Session scope for ShoppingCart because each user needs their own cart instance that persists across multiple requests within the same session. Using Singleton would share the cart between all users, and Request scope would lose cart items between requests. Session scope provides the right lifecycle for user-specific state."

### 🟡 4.2 Bean Definition and Registration

#### Ways to Define Beans
1. **Component Scanning** (Annotation-based)
   ```java
   @Component
   public class MyComponent {
       // Automatically detected and registered
   }
   ```

2. **Java Configuration** (`@Bean` methods)
   ```java
   @Configuration
   public class AppConfig {
       
       @Bean
       public DataSource dataSource() {
           return new HikariDataSource();
       }
       
       @Bean
       public JdbcTemplate jdbcTemplate(DataSource dataSource) {
           return new JdbcTemplate(dataSource);
       }
   }
   ```

3. **XML Configuration** (Legacy)
   ```xml
   <bean id="userService" class="com.example.UserService">
       <property name="repository" ref="userRepository"/>
   </bean>
   ```

#### `@Component` vs `@Bean`
| Aspect | `@Component` | `@Bean` |
|--------|--------------|---------|
| Usage | On class level | On method level |
| Control | Spring creates instance | You create instance |
| Multiple Instances | Single instance per class | Can return different instances |
| Third-Party Classes | Only your own classes | Any class (including third-party) |
| Configuration | Simple, automatic | Explicit, programmatic |

#### Bean Registration Process
```java
// Simplified bean registration flow
public void registerBeans() {
    // 1. Component scanning
    scanForComponents();
    
    // 2. Process @Bean methods
    processConfigurationClasses();
    
    // 3. Register beans in BeanFactory
    registerBeanDefinitions();
    
    // 4. Resolve dependencies
    resolveDependencies();
}
```

#### Conditional Bean Registration
```java
@Configuration
public class ConditionalConfig {
    
    @Bean
    @ConditionalOnProperty(name = "cache.enabled", havingValue = "true")
    public CacheManager cacheManager() {
        return new ConcurrentMapCacheManager();
    }
    
    @Bean
    @ConditionalOnMissingBean
    public DataSource defaultDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
}
```

#### Interview Questions
**Intermediate**: Compare `@Component` and `@Bean` annotations.
**Advanced**: How does Spring process `@Configuration` classes?
**Expert**: Explain bean definition overriding in Spring.

#### Code Review Scenario
"Review this configuration class. What issues do you see?"
```java
@Configuration
public class ProblematicConfig {
    
    @Bean
    public ServiceA serviceA() {
        return new ServiceA();
    }
    
    @Bean  
    public ServiceB serviceB() {
        return new ServiceB(serviceA());  // Direct method call!
    }
}
```

**Answer**: "The issue is calling `serviceA()` method directly instead of getting it from the container. This creates a new instance bypassing Spring's dependency injection. ServiceB won't get the same singleton instance that other beans get. The fix is to make ServiceB a parameter: `public ServiceB serviceB(ServiceA serviceA)`."

### 🟡 4.3 Bean Post Processors

#### What are they?
BeanPostProcessors are callback interfaces that allow custom modification of new bean instances.

#### Types of BeanPostProcessors
1. **BeanPostProcessor**: General purpose
2. **InstantiationAwareBeanPostProcessor**: Before instantiation
3. **DestructionAwareBeanPostProcessor**: Before destruction
4. **MergedBeanDefinitionPostProcessor**: After definition merging

#### BeanPostProcessor Example
```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {
    
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        System.out.println("Before init: " + beanName);
        return bean;  // Return modified bean
    }
    
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        System.out.println("After init: " + beanName);
        
        // Example: Wrap bean with proxy
        if (bean instanceof Cacheable) {
            return createCacheProxy(bean);
        }
        
        return bean;
    }
}
```

#### Common Built-in BeanPostProcessors
1. **AutowiredAnnotationBeanPostProcessor**: Processes `@Autowired`
2. **CommonAnnotationBeanPostProcessor**: Processes `@Resource`, `@PostConstruct`
3. **PersistenceAnnotationBeanPostProcessor**: Processes `@PersistenceContext`
4. **RequiredAnnotationBeanPostProcessor**: Processes `@Required`

#### How They Work Internally
```java
// Simplified Spring initialization with BeanPostProcessors
protected Object initializeBean(String beanName, Object bean, RootBeanDefinition mbd) {
    // 1. Apply BeanPostProcessors BEFORE initialization
    Object wrappedBean = applyBeanPostProcessorsBeforeInitialization(bean, beanName);
    
    // 2. Invoke init methods
    invokeInitMethods(beanName, wrappedBean, mbd);
    
    // 3. Apply BeanPostProcessors AFTER initialization  
    wrappedBean = applyBeanPostProcessorsAfterInitialization(wrappedBean, beanName);
    
    return wrappedBean;
}
```

#### Real-World Use Cases
1. **Validation**: Validate bean state before initialization
2. **Proxy Creation**: Wrap beans with AOP proxies
3. **Monitoring**: Track bean creation metrics
4. **Configuration Validation**: Verify configuration correctness

#### Interview Questions
**Advanced**: What are BeanPostProcessors and when would you use them?
**Expert**: How does `@Autowired` processing work internally?

#### Scenario-Based Question
"You need to automatically encrypt/decrypt specific fields in your entities. How would you implement this?"

**Answer**: "I would create a custom BeanPostProcessor that inspects beans for fields annotated with `@Encrypted`. In `postProcessAfterInitialization`, I would wrap the bean with a proxy that intercepts getter/setter calls to these fields, performing encryption before storage and decryption after retrieval. This keeps the encryption logic separate from business logic."

---

## 5. Configuration and Application Lifecycle

### 🟢 5.1 Spring Boot Application Lifecycle

#### Application Startup Phases
1. **Pre-initialization**: Environment setup, property sources
2. **Context Creation**: `ApplicationContext` instantiation
3. **Bean Registration**: Bean definitions loaded
4. **Bean Instantiation**: Beans created and dependencies injected
5. **Post-processing**: BeanPostProcessors applied
6. **Application Ready**: `ApplicationReadyEvent` published
7. **Request Processing**: Application services requests

#### Application Events
```java
@Component
public class ApplicationEventListener {
    
    // Fired when ApplicationContext is initialized
    @EventListener(ContextRefreshedEvent.class)
    public void onContextRefreshed() {
        System.out.println("Context refreshed");
    }
    
    // Fired when application is ready to service requests
    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationReady() {
        System.out.println("Application ready");
    }
    
    // Fired on application shutdown
    @EventListener(ContextClosedEvent.class)
    public void onContextClosed() {
        System.out.println("Context closed");
    }
}
```

#### Application Context Hierarchy
```
Bootstrap Context (Parent)
    ↓
Application Context (Child)
    ↓
Servlet Web Application Context (Grandchild - if web app)
```

#### Spring Boot Startup Sequence
```java
// Main method execution
public static void main(String[] args) {
    // 1. Create SpringApplication instance
    SpringApplication app = new SpringApplication(Application.class);
    
    // 2. Configure application
    app.setBannerMode(Banner.Mode.OFF);
    
    // 3. Run application
    ConfigurableApplicationContext context = app.run(args);
    
    // 4. Application runs until shutdown
    // 5. Context closes on shutdown
}
```

#### Common Startup Issues
1. **Slow Startup**: Too many beans, heavy initialization
2. **Bean Creation Errors**: Missing dependencies, circular references
3. **Configuration Errors**: Invalid property values
4. **Port Conflicts**: Port already in use

#### Interview Questions
**Intermediate**: What happens during Spring Boot application startup?
**Advanced**: Explain the Spring application event system.
**Expert**: How would you optimize application startup time?

#### Debugging Scenario
"Your Spring Boot application takes 30 seconds to start. How would you diagnose and fix this?"

**Answer**: "I would:
1. Enable debug logging: `logging.level.org.springframework=DEBUG`
2. Use Spring Boot Actuator's startup endpoint if available
3. Profile startup with JVM tools or `SpringApplication.setApplicationStartup()`
4. Look for heavy `@PostConstruct` methods
5. Check for unnecessary auto-configurations
6. Verify database connections aren't timing out
7. Consider lazy initialization for non-critical beans"

### 🟡 5.2 Profiles and Environment-Specific Configuration

#### What are Profiles?
Profiles are a way to segregate parts of your application configuration and make it available only in certain environments.

#### Defining Profiles
```properties
# application.properties (default)
app.name=MyApp
spring.profiles.active=dev

# application-dev.properties
spring.datasource.url=jdbc:h2:mem:devdb
logging.level.root=DEBUG

# application-prod.properties
spring.datasource.url=jdbc:mysql://prod-host:3306/proddb
logging.level.root=WARN
management.endpoints.web.exposure.include=health,info
```

#### Profile Activation
1. **Command Line**: `java -jar app.jar --spring.profiles.active=prod`
2. **Environment Variable**: `SPRING_PROFILES_ACTIVE=prod`
3. **System Property**: `-Dspring.profiles.active=prod`
4. **Programmatically**: `SpringApplication.setAdditionalProfiles()`

#### Profile-Specific Beans
```java
@Configuration
public class DatabaseConfig {
    
    @Bean
    @Profile("dev")
    public DataSource devDataSource() {
        return new EmbeddedDatabaseBuilder()
            .setType(EmbeddedDatabaseType.H2)
            .build();
    }
    
    @Bean
    @Profile("prod")
    public DataSource prodDataSource() {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(env.getProperty("spring.datasource.url"));
        return ds;
    }
}
```

#### Profile Groups (Spring Boot 2.4+)
```properties
# Group multiple profiles
spring.profiles.group.production=prod,monitoring,audit
spring.profiles.group.development=dev,debug

# Activate group
spring.profiles.active=production
```

#### Best Practices
1. **Use Meaningful Names**: `dev`, `test`, `staging`, `prod`
2. **Minimize Profile-Specific Code**: Use configuration properties when possible
3. **Test All Profiles**: Ensure each profile works correctly
4. **Document Profile Requirements**: Document what each profile enables

#### Interview Questions
**Intermediate**: How do Spring profiles work?
**Advanced**: What are profile groups and when would you use them?
**Expert**: How would you handle secrets in different environments?

#### Deployment Scenario
"You need to deploy your application to AWS with different configurations for development, staging, and production. How would you manage configurations?"

**Answer**: "I would:
1. Use Spring profiles: `dev`, `staging`, `prod`
2. Store sensitive data in AWS Parameter Store or Secrets Manager
3. Use `spring.config.import` to load from cloud configuration services
4. Create Docker images with profile activation via environment variables
5. Use infrastructure-as-code (CloudFormation/Terraform) to set environment-specific properties
6. Implement health checks and monitoring specific to each environment"

### 🟢 5.3 Externalized Configuration

#### Configuration Sources
Spring Boot loads configuration from multiple sources (in order):
1. **Default properties** (from `SpringApplication.getDefaultProperties()`)
2. **`@PropertySource` annotations**
3. **Config data** (application.properties/yml)
4. **RandomValuePropertySource**
5. **OS environment variables**
6. **Java System properties** (`-D` arguments)
7. **JNDI attributes**
8. **ServletContext init parameters**
9. **ServletConfig init parameters**
10. **Command line arguments**

#### Configuration Properties Binding
```java
@ConfigurationProperties(prefix = "app.mail")
@Component
@Data
public class MailProperties {
    private String host;
    private int port;
    private String username;
    private String password;
    private Map<String, String> headers = new HashMap<>();
    
    // Nested configuration
    private Ssl ssl = new Ssl();
    
    @Data
    public static class Ssl {
        private boolean enabled;
        private String protocol;
    }
}

// application.yml
app:
  mail:
    host: smtp.gmail.com
    port: 587
    username: user@gmail.com
    headers:
      from: noreply@example.com
      reply-to: support@example.com
    ssl:
      enabled: true
      protocol: TLSv1.2
```

#### Type-Safe Configuration Properties
Advantages of `@ConfigurationProperties`:
1. **Type Safety**: Compile-time checking
2. **Meta-data Support**: IDE auto-completion
3. **Validation**: `@Validated` with `@NotNull`, `@Min`, etc.
4. **Relaxed Binding**: `mail.host`, `mail_host`, `MAIL_HOST` all work
5. **Nested Properties**: Support for complex object graphs

#### Relaxed Binding Rules
Spring Boot supports multiple property naming conventions:
- `app.mail.host` (canonical)
- `app_mail_host` (environment variables)
- `APP_MAIL_HOST` (system properties)
- `app.mail.host` (yaml)

#### Configuration Property Validation
```java
@ConfigurationProperties(prefix = "app")
@Validated
@Component
public class AppProperties {
    
    @NotNull
    private String name;
    
    @Min(1)
    @Max(100)
    private int maxConnections;
    
    @Pattern(regexp = "^https?://.*")
    private String url;
    
    @Valid  // Validate nested properties
    private Database database;
    
    @Data
    public static class Database {
        @NotEmpty
        private String url;
        
        @Min(1)
        private int timeout;
    }
}
```

#### Interview Questions
**Intermediate**: What are the different sources for configuration properties?
**Advanced**: How does relaxed binding work in Spring Boot?
**Expert**: How would you implement custom property source?

#### Security Scenario
"You need to store database passwords securely. What are your options?"

**Answer**: "Options include:
1. **Environment Variables**: `SPRING_DATASOURCE_PASSWORD`
2. **System Properties**: `-Dspring.datasource.password`
3. **External Secrets Management**: HashiCorp Vault, AWS Secrets Manager
4. **Encrypted Properties**: Use `jasypt-spring-boot` for encrypted properties
5. **Kubernetes Secrets**: Mount as files or environment variables
6. **Cloud Provider Solutions**: AWS Parameter Store, Azure Key Vault

Best practice is to never commit secrets to version control and use environment-specific secret management."

---

*[The guide continues with detailed sections on REST API development, database integration, security, testing, and advanced topics...]*


## 6. REST API Development

### 🟢 6.1 REST Controllers and Request Mapping

#### `@RestController` vs `@Controller`
```java
// @Controller returns view names
@Controller
public class ViewController {
    @GetMapping("/home")
    public String home() {
        return "home";  // Returns view name
    }
}

// @RestController returns JSON/XML (uses @ResponseBody)
@RestController
@RequestMapping("/api")
public class ApiController {
    
    @GetMapping("/users")
    public List<User> getUsers() {
        return userService.findAll();  // Automatically converted to JSON
    }
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User created = userService.save(user);
        return ResponseEntity.created(URI.create("/api/users/" + created.getId()))
                           .body(created);
    }
}
```

#### Request Mapping Annotations
```java
@RestController
@RequestMapping("/api/v1/users")  // Base path
public class UserController {
    
    // GET /api/v1/users
    @GetMapping
    public List<User> getAll() { ... }
    
    // GET /api/v1/users/{id}
    @GetMapping("/{id}")
    public User getById(@PathVariable Long id) { ... }
    
    // GET /api/v1/users/search?name=John
    @GetMapping("/search")
    public List<User> search(@RequestParam String name) { ... }
    
    // POST /api/v1/users
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody @Valid User user) { ... }
    
    // PUT /api/v1/users/{id}
    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User user) { ... }
    
    // DELETE /api/v1/users/{id}
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) { ... }
    
    // PATCH /api/v1/users/{id}/status
    @PatchMapping("/{id}/status")
    public User updateStatus(@PathVariable Long id, 
                            @RequestParam String status) { ... }
}
```

#### HTTP Method Best Practices
- **GET**: Retrieve resources (idempotent, safe)
- **POST**: Create new resource (not idempotent)
- **PUT**: Update/replace entire resource (idempotent)
- **PATCH**: Partial update (idempotent)
- **DELETE**: Remove resource (idempotent)

#### Path Variables and Request Parameters
```java
@GetMapping("/users/{userId}/orders/{orderId}")
public Order getOrder(@PathVariable Long userId,
                     @PathVariable Long orderId,
                     @RequestParam(required = false, defaultValue = "false") boolean details) {
    // /users/123/orders/456?details=true
}

// Optional path variables (Spring 5+)
@GetMapping({"/users/{id}", "/users"})
public User getByIdOrAll(@PathVariable(required = false) Long id) {
    return id != null ? userService.findById(id) : userService.findAll();
}
```

#### Request and Response Bodies
```java
// Request DTO (Data Transfer Object)
@Data
public class CreateUserRequest {
    @NotBlank
    private String username;
    
    @Email
    private String email;
    
    @Size(min = 8)
    private String password;
}

// Response DTO
@Data
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private LocalDateTime createdAt;
}

// Controller using DTOs
@PostMapping
public ResponseEntity<UserResponse> createUser(@RequestBody @Valid CreateUserRequest request) {
    User user = userService.createUser(request);
    UserResponse response = mapToResponse(user);
    return ResponseEntity.created(URI.create("/api/users/" + user.getId()))
                       .body(response);
}
```

#### Interview Questions
**Beginner**: What's the difference between `@Controller` and `@RestController`?
**Intermediate**: When would you use PUT vs PATCH?
**Advanced**: How does Spring MVC handle request mapping internally?

#### API Design Scenario
"You're designing a REST API for a blog platform. What endpoints would you create and which HTTP methods would you use?"

**Answer**: "Key endpoints would include:
- `GET /api/posts` - List all posts (with pagination)
- `POST /api/posts` - Create new post
- `GET /api/posts/{id}` - Get specific post
- `PUT /api/posts/{id}` - Update entire post
- `PATCH /api/posts/{id}` - Partial update (e.g., just title)
- `DELETE /api/posts/{id}` - Delete post
- `GET /api/posts/{id}/comments` - Get post comments
- `POST /api/posts/{id}/comments` - Add comment
- `PUT /api/posts/{id}/publish` - Publish post

I'd use appropriate HTTP status codes: 200 OK, 201 Created, 204 No Content, 400 Bad Request, 404 Not Found, 409 Conflict."

### 🟢 6.2 Request Validation

#### Bean Validation Annotations
```java
@Data
public class UserRequest {
    
    @NotNull(message = "Username is required")
    @Size(min = 3, max = 50, message = "Username must be 3-50 characters")
    private String username;
    
    @NotNull
    @Email(message = "Invalid email format")
    private String email;
    
    @NotNull
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$", 
             message = "Password must contain uppercase, lowercase, and number")
    private String password;
    
    @Min(18)
    @Max(100)
    private Integer age;
    
    @NotNull
    @Past
    private LocalDate birthDate;
    
    @Future
    private LocalDate membershipExpiry;
    
    @AssertTrue(message = "Terms must be accepted")
    private Boolean acceptedTerms;
    
    @NotEmpty
    private List<@Email String> secondaryEmails;
}
```

#### Enabling Validation
```java
@RestController
@Validated  // Enables method parameter validation
public class UserController {
    
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody @Valid UserRequest request) {
        // Only reaches here if validation passes
        return ResponseEntity.ok(userService.create(request));
    }
    
    @GetMapping("/users/search")
    public List<User> searchUsers(
            @RequestParam @NotBlank String query,
            @RequestParam @Min(1) @Max(100) int limit) {
        // Method parameter validation
        return userService.search(query, limit);
    }
}
```

#### Custom Validators
```java
// Custom annotation
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneNumberValidator.class)
public @interface ValidPhoneNumber {
    String message() default "Invalid phone number";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

// Validator implementation
public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {
    
    private Pattern pattern;
    
    @Override
    public void initialize(ValidPhoneNumber constraintAnnotation) {
        pattern = Pattern.compile("^\\+?[1-9]\\d{1,14}$");  // E.164 format
    }
    
    @Override
    public boolean isValid(String phoneNumber, ConstraintValidatorContext context) {
        if (phoneNumber == null) {
            return true;  // Use @NotNull for null checks
        }
        return pattern.matcher(phoneNumber).matches();
    }
}

// Usage
public class ContactRequest {
    @ValidPhoneNumber
    private String phone;
}
```

#### Validation Groups
```java
// Define validation groups
public interface OnCreate {}
public interface OnUpdate {}

// Use groups in entity
public class User {
    @NotNull(groups = {OnCreate.class, OnUpdate.class})
    private Long id;
    
    @NotNull(groups = OnCreate.class)
    @Size(min = 3, groups = OnCreate.class)
    private String username;
    
    @Email(groups = {OnCreate.class, OnUpdate.class})
    private String email;
}

// Use specific group in controller
@PostMapping
public User create(@RequestBody @Validated(OnCreate.class) User user) { ... }

@PutMapping("/{id}")
public User update(@PathVariable Long id, 
                  @RequestBody @Validated(OnUpdate.class) User user) { ... }
```

#### Validation Error Handling
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .collect(Collectors.toList());
        
        ErrorResponse errorResponse = new ErrorResponse(
            "Validation Failed",
            HttpStatus.BAD_REQUEST.value(),
            errors
        );
        
        return ResponseEntity.badRequest().body(errorResponse);
    }
}

// Error response DTO
@Data
@AllArgsConstructor
public class ErrorResponse {
    private String message;
    private int status;
    private List<String> errors;
    private LocalDateTime timestamp = LocalDateTime.now();
}
```

#### Interview Questions
**Intermediate**: How do you handle validation errors in REST APIs?
**Advanced**: When would you use validation groups?
**Expert**: How does Spring integrate with Bean Validation (Hibernate Validator)?

#### Validation Scenario
"You're building a registration API that needs different validation for email-only registration vs full registration. How would you implement this?"

**Answer**: "I would use validation groups:
1. Define groups: `EmailOnlyRegistration`, `FullRegistration`
2. Annotate fields with appropriate groups
3. Use `@Validated(EmailOnlyRegistration.class)` for email-only endpoint
4. Use `@Validated(FullRegistration.class)` for full registration endpoint
5. Create custom validators for complex rules like password strength
6. Return clear error messages with field names"

### 🟡 6.3 Exception Handling

#### Spring MVC Exception Handling Approaches
1. **`@ExceptionHandler`** (Controller-level)
   ```java
   @RestController
   public class UserController {
       
       @ExceptionHandler(UserNotFoundException.class)
       public ResponseEntity<ErrorResponse> handleUserNotFound(UserNotFoundException ex) {
           ErrorResponse error = new ErrorResponse(
               "User not found",
               HttpStatus.NOT_FOUND.value(),
               List.of(ex.getMessage())
           );
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
       }
   }
   ```

2. **`@ControllerAdvice`** (Global)
   ```java
   @ControllerAdvice
   public class GlobalExceptionHandler {
       
       @ExceptionHandler(ResourceNotFoundException.class)
       public ResponseEntity<ErrorResponse> handleNotFound(ResourceNotFoundException ex) {
           // Handle all resource not found exceptions
       }
       
       @ExceptionHandler(MethodArgumentNotValidException.class)
       public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
           // Handle validation errors
       }
       
       @ExceptionHandler(Exception.class)
       public ResponseEntity<ErrorResponse> handleAll(Exception ex) {
           // Fallback for unhandled exceptions
       }
   }
   ```

3. **`@ResponseStatus`** (Simple)
   ```java
   @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "User not found")
   public class UserNotFoundException extends RuntimeException {
       public UserNotFoundException(Long id) {
           super("User with ID " + id + " not found");
       }
   }
   
   // Throwing it automatically returns 404
   throw new UserNotFoundException(userId);
   ```

#### Custom Exception Hierarchy
```java
// Base application exception
public abstract class AppException extends RuntimeException {
    private final ErrorCode errorCode;
    
    public AppException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }
    
    public abstract HttpStatus getHttpStatus();
}

// Specific exceptions
public class ResourceNotFoundException extends AppException {
    public ResourceNotFoundException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
    
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }
}

public class ValidationException extends AppException {
    public ValidationException(ErrorCode errorCode, String message) {
        super(errorCode, message);
    }
    
    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.BAD_REQUEST;
    }
}

// Error codes enum
public enum ErrorCode {
    USER_NOT_FOUND("USER_001"),
    USER_EMAIL_EXISTS("USER_002"),
    INVALID_CREDENTIALS("AUTH_001"),
    INSUFFICIENT_PERMISSIONS("AUTH_002");
    
    private final String code;
    
    ErrorCode(String code) {
        this.code = code;
    }
}
```

#### Response Entity for Errors
```java
@ControllerAdvice
public class AppExceptionHandler {
    
    @ExceptionHandler(AppException.class)
    public ResponseEntity<ApiError> handleAppException(AppException ex) {
        ApiError error = ApiError.builder()
            .timestamp(Instant.now())
            .status(ex.getHttpStatus().value())
            .error(ex.getHttpStatus().getReasonPhrase())
            .code(ex.getErrorCode().name())
            .message(ex.getMessage())
            .path(getRequestPath())
            .build();
        
        return new ResponseEntity<>(error, ex.getHttpStatus());
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGenericException(Exception ex) {
        ApiError error = ApiError.builder()
            .timestamp(Instant.now())
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .error("Internal Server Error")
            .message("An unexpected error occurred")
            .path(getRequestPath())
            .build();
        
        // Log full exception for debugging
        logger.error("Unhandled exception", ex);
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// API Error DTO
@Data
@Builder
public class ApiError {
    private Instant timestamp;
    private int status;
    private String error;
    private String code;
    private String message;
    private String path;
    private List<FieldError> fieldErrors;
    
    @Data
    @AllArgsConstructor
    public static class FieldError {
        private String field;
        private String message;
        private Object rejectedValue;
    }
}
```

#### Best Practices for Exception Handling
1. **Use Specific Exceptions**: Don't throw generic `Exception`
2. **Include Context**: Add relevant information to exceptions
3. **Log Appropriately**: Log at correct level (ERROR for system errors, WARN for business errors)
4. **Return User-Friendly Messages**: Don't expose stack traces
5. **Use HTTP Status Codes Correctly**: 
   - 400: Client error (validation, bad request)
   - 401: Unauthorized (authentication needed)
   - 403: Forbidden (no permission)
   - 404: Resource not found
   - 409: Conflict (e.g., duplicate resource)
   - 500: Server error

#### Interview Questions
**Intermediate**: What's the difference between `@ExceptionHandler` and `@ControllerAdvice`?
**Advanced**: How would you handle exceptions in a microservices architecture?
**Expert**: How does Spring MVC's exception resolution work?

#### Error Handling Scenario
"You have an API that processes payments. What exceptions would you define and how would you handle them?"

**Answer**: "Key exceptions would include:
1. `PaymentValidationException` (400): Invalid payment data
2. `PaymentMethodNotFoundException` (404): Unknown payment method
3. `InsufficientFundsException` (402): Payment required
4. `PaymentProcessingException` (503): External payment gateway down
5. `DuplicatePaymentException` (409): Same payment processed twice

I'd create a `PaymentExceptionHandler` with `@ControllerAdvice` that maps each exception to appropriate HTTP status and returns error codes for client handling. For external service failures, I'd implement retry logic and circuit breakers."

### 🟡 6.4 Response Entity and HTTP Status Codes

#### ResponseEntity Usage
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {
    
    // Simple return (implicit 200 OK)
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productService.findById(id);
    }
    
    // Explicit ResponseEntity with headers
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody @Valid ProductRequest request) {
        Product product = productService.create(request);
        
        URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(product.getId())
            .toUri();
        
        return ResponseEntity
            .created(location)
            .header("X-Product-ID", product.getId().toString())
            .body(product);
    }
    
    // Custom status without body
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    // Conditional responses
    @GetMapping("/{id}/status")
    public ResponseEntity<?> getProductStatus(@PathVariable Long id) {
        ProductStatus status = productService.getStatus(id);
        
        if (status == ProductStatus.DISCONTINUED) {
            return ResponseEntity
                .status(HttpStatus.GONE)
                .body("Product has been discontinued");
        }
        
        return ResponseEntity.ok(status);
    }
}
```

#### HTTP Status Code Best Practices
- **200 OK**: Successful GET, PUT, PATCH, DELETE
- **201 Created**: Successful POST (include Location header)
- **204 No Content**: Successful DELETE, no body needed
- **400 Bad Request**: Invalid request (validation failed)
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Authenticated but no permission
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource conflict (duplicate, constraint violation)
- **422 Unprocessable Entity**: Semantic errors (business rules)
- **429 Too Many Requests**: Rate limiting
- **500 Internal Server Error**: Unexpected server error
- **503 Service Unavailable**: Maintenance, overloaded

#### Response Wrapper Pattern
```java
// Generic API response
@Data
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private List<String> errors;
    private Instant timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, "Success", data, null, Instant.now());
    }
    
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, message, data, null, Instant.now());
    }
    
    public static <T> ApiResponse<T> error(String message, List<String> errors) {
        return new ApiResponse<>(false, message, null, errors, Instant.now());
    }
}

// Controller using wrapper
@GetMapping("/{id}")
public ApiResponse<Product> getProduct(@PathVariable Long id) {
    Product product = productService.findById(id);
    return ApiResponse.success(product);
}

// Global response wrapper (using ResponseBodyAdvice)
@ControllerAdvice
public class ResponseWrapperAdvice implements ResponseBodyAdvice<Object> {
    
    @Override
    public boolean supports(MethodParameter returnType, 
                           Class<? extends HttpMessageConverter<?>> converterType) {
        return true;  // Wrap all responses
    }
    
    @Override
    public Object beforeBodyWrite(Object body, MethodParameter returnType,
                                 MediaType selectedContentType,
                                 Class<? extends HttpMessageConverter<?>> selectedConverterType,
                                 ServerHttpRequest request, ServerHttpResponse response) {
        
        if (body instanceof ApiResponse) {
            return body;  // Already wrapped
        }
        
        if (body instanceof ResponseEntity) {
            return body;  // Don't wrap ResponseEntity
        }
        
        return ApiResponse.success(body);
    }
}
```

#### Content Negotiation
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    
    // Produces JSON (default)
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUserJson(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    // Produces XML
    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_XML_VALUE)
    public User getUserXml(@PathVariable Long id) {
        return userService.findById(id);
    }
    
    // Multiple content types
    @GetMapping(value = "/{id}", produces = {
        MediaType.APPLICATION_JSON_VALUE,
        MediaType.APPLICATION_XML_VALUE
    })
    public User getUser(@PathVariable Long id) {
        return userService.findById(id);
    }
}

// Accept header determines response format
// Accept: application/json → JSON response
// Accept: application/xml → XML response
```

#### Interview Questions
**Intermediate**: When would you use 201 vs 200 status codes?
**Advanced**: What are the pros and cons of response wrapper pattern?
**Expert**: How does Spring handle content negotiation?

#### API Design Scenario
"You're designing a file upload API. What HTTP status codes would you return for different scenarios?"

**Answer**: "For file upload API:
- `201 Created`: File successfully uploaded (with Location header)
- `400 Bad Request`: Invalid file format or size
- `409 Conflict`: File with same name already exists
- `413 Payload Too Large`: File exceeds size limit
- `415 Unsupported Media Type`: Unsupported file type
- `500 Internal Server Error`: Storage service failure
- `503 Service Unavailable`: Storage system maintenance

I'd also include progress reporting for large files and support resumable uploads with `206 Partial Content`."

---

## 7. Validation and Exception Handling (Advanced)

### 🟡 7.1 Advanced Validation Techniques

#### Cross-Field Validation
```java
@Data
public class RegistrationRequest {
    
    @NotBlank
    private String password;
    
    @NotBlank
    private String confirmPassword;
    
    @Valid  // Validate nested object
    private Address address;
    
    // Cross-field validation method
    @AssertTrue(message = "Passwords must match")
    public boolean isPasswordConfirmed() {
        return password != null && password.equals(confirmPassword);
    }
}

// Or using custom validator
@Target({TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordMatchesValidator.class)
public @interface PasswordMatches {
    String message() default "Passwords don't match";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, RegistrationRequest> {
    
    @Override
    public boolean isValid(RegistrationRequest request, ConstraintValidatorContext context) {
        return request.getPassword().equals(request.getConfirmPassword());
    }
}
```

#### Conditional Validation
```java
@Data
public class PaymentRequest {
    
    @NotNull
    private PaymentMethod paymentMethod;
    
    // Only validate if paymentMethod is CREDIT_CARD
    @Valid
    @ConditionalValidation(
        condition = "paymentMethod == T(PaymentMethod).CREDIT_CARD",
        fields = {"cardNumber", "expiryDate", "cvv"}
    )
    private CreditCardDetails creditCardDetails;
    
    // Only validate if paymentMethod is PAYPAL
    @Email
    @ConditionalValidation(
        condition = "paymentMethod == T(PaymentMethod).PAYPAL"
    )
    private String paypalEmail;
}

// Custom conditional validation annotation
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ConditionalValidator.class)
public @interface ConditionalValidation {
    String condition();
    String[] fields() default {};
    String message() default "Field validation failed";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
```

#### Programmatic Validation
```java
@Service
public class UserService {
    
    @Autowired
    private Validator validator;
    
    public User createUser(UserRequest request) {
        // Manual validation
        Set<ConstraintViolation<UserRequest>> violations = validator.validate(request);
        
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
        
        // Business rule validation
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessValidationException("Email already exists");
        }
        
        return userRepository.save(mapToEntity(request));
    }
}
```

#### Validation in Service Layer
```java
@Service
@Validated  // Enables method-level validation
public class OrderService {
    
    public Order createOrder(@Valid OrderRequest request) {
        // Validated before execution
        return orderRepository.save(createOrderEntity(request));
    }
    
    public Order updateOrder(Long id, 
                            @Valid @NotNull OrderUpdateRequest updateRequest) {
        // Both parameter and method validation
        Order order = findOrderById(id);
        applyUpdate(order, updateRequest);
        return orderRepository.save(order);
    }
    
    // Return value validation
    @Validated
    public @Valid Order getValidatedOrder(Long id) {
        Order order = findOrderById(id);
        // Return value will be validated
        return order;
    }
}
```

#### Interview Questions
**Advanced**: How would you implement cross-field validation?
**Expert**: What's the difference between annotation-based and programmatic validation?

#### Complex Validation Scenario
"You're building a flight booking system. How would you validate that departure date is before arrival date, and that the passenger count doesn't exceed available seats?"

**Answer**: "I would:
1. Use `@AssertTrue` method for date validation in the booking request
2. Create a custom validator for seat availability that checks against inventory service
3. Use validation groups for different booking types (economy, business)
4. Implement asynchronous validation for real-time seat availability
5. Add cache for frequently validated data to improve performance
6. Return specific error codes for each validation failure"

### 🟡 7.2 Global Exception Handling Strategies

#### Hierarchical Exception Handling
```java
@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SpecificExceptionHandler {
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFound(UserNotFoundException ex) {
        // Specific handling for user not found
    }
}

@ControllerAdvice
@Order(Ordered.LOWEST_PRECEDENCE)
public class GenericExceptionHandler {
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleAll(Exception ex) {
        // Generic fallback handling
    }
}
```

#### Domain-Specific Exception Handlers
```java
// Payment exception handler
@ControllerAdvice(assignableTypes = {PaymentController.class})
public class PaymentExceptionHandler {
    
    @ExceptionHandler(PaymentGatewayException.class)
    public ResponseEntity<ApiError> handlePaymentGateway(PaymentGatewayException ex) {
        // Payment-specific handling with retry logic
    }
    
    @ExceptionHandler(InsufficientFundsException.class)
    public ResponseEntity<ApiError> handleInsufficientFunds(InsufficientFundsException ex) {
        return ResponseEntity
            .status(HttpStatus.PAYMENT_REQUIRED)
            .body(createError("Insufficient funds", "PAYMENT_001"));
    }
}

// User exception handler  
@ControllerAdvice(assignableTypes = {UserController.class})
public class UserExceptionHandler {
    
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleUserExists(UserAlreadyExistsException ex) {
        return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(createError("User already exists", "USER_001"));
    }
}
```

#### Exception Translation with AOP
```java
@Aspect
@Component
public class ServiceExceptionTranslator {
    
    @Around("@within(org.springframework.stereotype.Service)")
    public Object translateExceptions(ProceedingJoinPoint joinPoint) throws Throwable {
        try {
            return joinPoint.proceed();
        } catch (DataAccessException ex) {
            // Translate database exceptions
            throw new RepositoryException("Database error occurred", ex);
        } catch (IllegalArgumentException ex) {
            // Translate illegal argument exceptions
            throw new ValidationException("Invalid input", ex);
        } catch (Exception ex) {
            // Translate other exceptions
            throw new ServiceException("Service error", ex);
        }
    }
}

// Service layer
@Service
public class UserService {
    
    public User createUser(UserRequest request) {
        // Any DataAccessException will be translated to RepositoryException
        return userRepository.save(convertToEntity(request));
    }
}
```

#### Error Response Internationalization
```java
@ControllerAdvice
public class InternationalizedExceptionHandler {
    
    @Autowired
    private MessageSource messageSource;
    
    @ExceptionHandler(AppException.class)
    public ResponseEntity<LocalizedError> handleAppException(
            AppException ex,
            HttpServletRequest request) {
        
        Locale locale = request.getLocale();
        String localizedMessage = messageSource.getMessage(
            ex.getMessageKey(),
            ex.getMessageArgs(),
            ex.getMessage(),
            locale
        );
        
        LocalizedError error = LocalizedError.builder()
            .code(ex.getErrorCode())
            .message(localizedMessage)
            .locale(locale.toLanguageTag())
            .build();
        
        return new ResponseEntity<>(error, ex.getHttpStatus());
    }
}

// Localized error response
@Data
@Builder
public class LocalizedError {
    private String code;
    private String message;
    private String locale;
    private Map<String, Object> details;
}

// Messages.properties
error.user.notfound=User not found
error.user.exists=User already exists

// Messages_fr.properties  
error.user.notfound=Utilisateur non trouvé
error.user.exists=Utilisateur existe déjà
```

#### Circuit Breaker Integration
```java
@Service
public class ExternalServiceClient {
    
    @CircuitBreaker(name = "externalService", fallbackMethod = "fallback")
    @Retry(name = "externalService", fallbackMethod = "fallback")
    @RateLimiter(name = "externalService")
    public ExternalResponse callExternalService(Request request) {
        // Call external service
        return externalServiceClient.call(request);
    }
    
    public ExternalResponse fallback(Request request, Exception ex) {
        // Fallback response when external service fails
        return ExternalResponse.builder()
            .status("FALLBACK")
            .message("Service temporarily unavailable")
            .build();
    }
}

// Exception handler for circuit breaker exceptions
@ExceptionHandler({CallNotPermittedException.class})
public ResponseEntity<ApiError> handleCircuitBreakerOpen(CallNotPermittedException ex) {
    return ResponseEntity
        .status(HttpStatus.SERVICE_UNAVAILABLE)
        .body(createError("Service temporarily unavailable", "CIRCUIT_OPEN"));
}
```

#### Interview Questions
**Advanced**: How would you implement exception handling for microservices?
**Expert**: What are the trade-offs of using AOP for exception translation?

#### Production Exception Handling Scenario
"You have a production application that needs to handle database outages gracefully. How would you design the exception handling?"

**Answer**: "I would implement:
1. **Circuit Breakers**: Prevent cascading failures during database outages
2. **Fallback Mechanisms**: Return cached data or default responses
3. **Graceful Degradation**: Disable non-critical features
4. **Monitoring and Alerts**: Immediate notification of database issues
5. **Retry Logic**: With exponential backoff for transient failures
6. **Health Checks**: Regular database connectivity checks
7. **Read-Only Mode**: Switch to read-only mode if writes fail
8. **Queue Processing**: Buffer writes in message queue for later processing

Exception handlers would return appropriate status codes: 503 for service unavailable, 424 for failed dependency, with clear error messages about degraded service."

---

*[The guide continues with comprehensive sections on database integration, JPA/Hibernate, transactions, Spring Security, testing, and advanced topics...]*


## 8. Database Integration: JDBC and JPA

### 🟢 8.1 JDBC with Spring Boot

#### What is JDBC?
Java Database Connectivity (JDBC) is a Java API for connecting and executing queries on databases.

#### Spring JDBC vs Plain JDBC
```java
// Plain JDBC (verbose, error-prone)
public User findById(Long id) {
    Connection conn = null;
    PreparedStatement stmt = null;
    ResultSet rs = null;
    
    try {
        conn = dataSource.getConnection();
        stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
        stmt.setLong(1, id);
        rs = stmt.executeQuery();
        
        if (rs.next()) {
            return mapRow(rs);
        }
        return null;
    } catch (SQLException e) {
        throw new RuntimeException(e);
    } finally {
        // Must close resources manually
        try { if (rs != null) rs.close(); } catch (SQLException e) {}
        try { if (stmt != null) stmt.close(); } catch (SQLException e) {}
        try { if (conn != null) conn.close(); } catch (SQLException e) {}
    }
}

// Spring JDBC (simplified)
@Repository
public class UserRepository {
    
    private final JdbcTemplate jdbcTemplate;
    
    public User findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            this::mapRow,
            id
        );
    }
    
    private User mapRow(ResultSet rs, int rowNum) throws SQLException {
        return User.builder()
            .id(rs.getLong("id"))
            .username(rs.getString("username"))
            .email(rs.getString("email"))
            .build();
    }
}
```

#### Spring JDBC Key Components
1. **`JdbcTemplate`**: Core class for JDBC operations
2. **`NamedParameterJdbcTemplate`**: Supports named parameters
3. **`SimpleJdbcInsert`**: Simplifies INSERT operations
4. **`RowMapper`**: Maps ResultSet rows to objects
5. **`ResultSetExtractor`**: For complex result processing

#### Configuration
```java
@Configuration
public class DatabaseConfig {
    
    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl(env.getProperty("spring.datasource.url"));
        dataSource.setUsername(env.getProperty("spring.datasource.username"));
        dataSource.setPassword(env.getProperty("spring.datasource.password"));
        dataSource.setMaximumPoolSize(20);
        return dataSource;
    }
    
    @Bean
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource);
    }
    
    @Bean
    public NamedParameterJdbcTemplate namedParameterJdbcTemplate(DataSource dataSource) {
        return new NamedParameterJdbcTemplate(dataSource);
    }
}
```

#### Common Operations
```java
@Repository
public class UserRepository {
    
    private final JdbcTemplate jdbcTemplate;
    private final NamedParameterJdbcTemplate namedJdbcTemplate;
    
    // Query for single object
    public User findById(Long id) {
        return jdbcTemplate.queryForObject(
            "SELECT * FROM users WHERE id = ?",
            new BeanPropertyRowMapper<>(User.class),
            id
        );
    }
    
    // Query for list
    public List<User> findAll() {
        return jdbcTemplate.query(
            "SELECT * FROM users",
            new BeanPropertyRowMapper<>(User.class)
        );
    }
    
    // Insert with generated key
    public Long insert(User user) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                "INSERT INTO users (username, email) VALUES (?, ?)",
                Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            return ps;
        }, keyHolder);
        
        return keyHolder.getKey().longValue();
    }
    
    // Update
    public int update(User user) {
        return jdbcTemplate.update(
            "UPDATE users SET username = ?, email = ? WHERE id = ?",
            user.getUsername(), user.getEmail(), user.getId()
        );
    }
    
    // Delete
    public int delete(Long id) {
        return jdbcTemplate.update("DELETE FROM users WHERE id = ?", id);
    }
    
    // Named parameters
    public List<User> findByUsernameAndEmail(String username, String email) {
        MapSqlParameterSource params = new MapSqlParameterSource()
            .addValue("username", username)
            .addValue("email", email);
            
        return namedJdbcTemplate.query(
            "SELECT * FROM users WHERE username = :username AND email = :email",
            params,
            new BeanPropertyRowMapper<>(User.class)
        );
    }
    
    // Batch update
    public int[] batchInsert(List<User> users) {
        return jdbcTemplate.batchUpdate(
            "INSERT INTO users (username, email) VALUES (?, ?)",
            users.stream()
                .map(user -> new Object[]{user.getUsername(), user.getEmail()})
                .collect(Collectors.toList())
        );
    }
}
```

#### Interview Questions
**Beginner**: What is JdbcTemplate and why use it?
**Intermediate**: Compare JdbcTemplate with plain JDBC.
**Advanced**: How does Spring handle database connection pooling?

#### Performance Considerations
1. **Connection Pooling**: Use HikariCP (default in Spring Boot)
2. **Batch Operations**: Use `batchUpdate()` for bulk inserts
3. **Fetch Size**: Configure appropriate fetch size for large result sets
4. **Statement Caching**: Enable prepared statement caching
5. **Transaction Management**: Use `@Transactional` for multiple operations

### 🟢 8.2 Introduction to JPA and Hibernate

#### What is JPA?
Java Persistence API (JPA) is a specification for object-relational mapping (ORM) in Java.

#### What is Hibernate?
Hibernate is the most popular implementation of JPA specification.

#### JPA vs Hibernate
| Aspect | JPA | Hibernate |
|--------|-----|-----------|
| Type | Specification (interface) | Implementation (class) |
| Features | Standard features | Extended features beyond JPA |
| Portability | High (switch implementations) | Vendor-specific features |
| Configuration | Standardized | Additional Hibernate-specific config |

#### Entity Definition
```java
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "username", nullable = false, length = 50, unique = true)
    private String username;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    @Enumerated(EnumType.STRING)
    private UserStatus status;
    
    @Version
    private Integer version;  // For optimistic locking
    
    @Lob
    private String bio;
    
    @Transient  // Not persisted
    private String temporaryData;
}
```

#### Primary Key Generation Strategies
```java
@Entity
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Auto-increment
    private Long id;
}

@Entity  
public class Order {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "order_seq")
    @SequenceGenerator(name = "order_seq", sequenceName = "order_sequence", allocationSize = 1)
    private Long id;
}

@Entity
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)  // UUID generation
    private String id;
}

@Entity
public class LogEntry {
    
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "log_gen")
    @TableGenerator(name = "log_gen", table = "id_generator", pkColumnName = "gen_name", 
                    valueColumnName = "gen_value", allocationSize = 1)
    private Long id;
}
```

#### Entity Relationships
```java
// One-to-Many
@Entity
public class Department {
    
    @Id
    private Long id;
    
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Employee> employees = new ArrayList<>();
}

@Entity
public class Employee {
    
    @Id
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;
}

// Many-to-Many
@Entity
public class Student {
    
    @Id
    private Long id;
    
    @ManyToMany
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "course_id")
    )
    private Set<Course> courses = new HashSet<>();
}

@Entity
public class Course {
    
    @Id
    private Long id;
    
    @ManyToMany(mappedBy = "courses")
    private Set<Student> students = new HashSet<>();
}

// One-to-One
@Entity
public class User {
    
    @Id
    private Long id;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UserProfile profile;
}

@Entity
public class UserProfile {
    
    @Id
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
```

#### Fetch Types: Lazy vs Eager
```java
@Entity
public class Order {
    
    @Id
    private Long id;
    
    // LAZY: Load on access (default for @ManyToOne, @OneToMany)
    @ManyToOne(fetch = FetchType.LAZY)
    private Customer customer;
    
    // EAGER: Load immediately (default for @OneToOne, @ManyToOne)
    @OneToMany(fetch = FetchType.EAGER)
    private List<OrderItem> items;
}

// When to use which:
// - LAZY: When relationship data isn't always needed (better performance)
// - EAGER: When relationship data is always needed (simpler code)
// - N+1 Problem: Eager fetching can cause multiple queries
```

#### Interview Questions
**Beginner**: What is JPA and how does it differ from JDBC?
**Intermediate**: Explain different primary key generation strategies.
**Advanced**: What are the trade-offs between LAZY and EAGER fetching?

#### Performance Scenario
"You have an Order entity with 100 OrderItem entities. What happens when you fetch an Order with EAGER loading vs LAZY loading?"

**Answer**: "With EAGER loading, Hibernate executes a JOIN query or separate query immediately to load all OrderItems. With LAZY loading, only the Order is loaded initially. When code accesses `order.getItems()`, Hibernate executes a second query to load the items (N+1 problem if not handled). For performance, LAZY loading with proper JOIN FETCH or entity graphs is usually better."

### 🟡 8.3 Spring Data JPA

#### What is Spring Data JPA?
Spring Data JPA is part of the larger Spring Data family that makes it easy to implement JPA-based repositories.

#### Repository Interfaces
```java
// Basic repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Inherits CRUD methods: save(), findById(), findAll(), delete(), etc.
}

// Custom repository with query methods
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Derived query methods
    List<User> findByUsername(String username);
    List<User> findByEmailContaining(String email);
    List<User> findByStatusOrderByCreatedAtDesc(UserStatus status);
    Optional<User> findByUsernameAndEmail(String username, String email);
    
    // Custom query with @Query
    @Query("SELECT u FROM User u WHERE u.email LIKE %:domain")
    List<User> findByEmailDomain(@Param("domain") String domain);
    
    // Native query
    @Query(value = "SELECT * FROM users WHERE created_at > :date", nativeQuery = true)
    List<User> findUsersCreatedAfter(@Param("date") LocalDateTime date);
    
    // Update query
    @Modifying
    @Query("UPDATE User u SET u.status = :status WHERE u.id = :id")
    int updateUserStatus(@Param("id") Long id, @Param("status") UserStatus status);
    
    // Projection
    @Query("SELECT u.username as username, u.email as email FROM User u")
    List<UserProjection> findUserProjections();
    
    // Pageable results
    Page<User> findByStatus(UserStatus status, Pageable pageable);
    
    // Slice for large datasets
    Slice<User> findSliceByStatus(UserStatus status, Pageable pageable);
}

// Custom repository implementation
public interface UserRepositoryCustom {
    List<User> findActiveUsersWithRecentOrders();
}

public class UserRepositoryImpl implements UserRepositoryCustom {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public List<User> findActiveUsersWithRecentOrders() {
        // Custom implementation using EntityManager
        return entityManager.createQuery(
            "SELECT DISTINCT u FROM User u JOIN FETCH u.orders o " +
            "WHERE u.status = 'ACTIVE' AND o.createdAt > :date", User.class)
            .setParameter("date", LocalDateTime.now().minusDays(30))
            .getResultList();
    }
}

// Extended repository
public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
    // Combines standard and custom methods
}
```

#### Derived Query Method Patterns
```java
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    // Basic patterns
    List<Product> findByName(String name);
    Optional<Product> findOneBySku(String sku);
    long countByCategory(String category);
    boolean existsBySku(String sku);
    void deleteByCategory(String category);
    
    // Comparison operators
    List<Product> findByPriceGreaterThan(BigDecimal price);
    List<Product> findByPriceLessThanEqual(BigDecimal price);
    List<Product> findByStockQuantityBetween(int min, int max);
    
    // Logical operators
    List<Product> findByNameAndCategory(String name, String category);
    List<Product> findByNameOrDescription(String name, String description);
    
    // Sorting
    List<Product> findByCategoryOrderByPriceAsc(String category);
    List<Product> findByCategoryOrderByNameDescPriceAsc(String category);
    
    // Limiting results
    Product findFirstByCategoryOrderByPriceAsc(String category);
    List<Product> findTop3ByCategoryOrderByCreatedAtDesc(String category);
    
    // Null handling
    List<Product> findByDescriptionIsNull();
    List<Product> findByDescriptionIsNotNull();
    
    // Like/Containing
    List<Product> findByNameLike(String pattern);  // %pattern%
    List<Product> findByNameStartingWith(String prefix);
    List<Product> findByNameEndingWith(String suffix);
    List<Product> findByNameContaining(String infix);
    
    // In clause
    List<Product> findByCategoryIn(List<String> categories);
    
    // Ignore case
    List<Product> findByNameIgnoreCase(String name);
}
```

#### Pagination and Sorting
```java
@Service
public class ProductService {
    
    private final ProductRepository productRepository;
    
    public Page<Product> getProducts(int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase(Sort.Direction.ASC.name()) 
            ? Sort.by(sortBy).ascending() 
            : Sort.by(sortBy).descending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        
        return productRepository.findAll(pageable);
    }
    
    public Page<Product> searchProducts(String keyword, Pageable pageable) {
        return productRepository.findByNameContainingOrDescriptionContaining(
            keyword, keyword, pageable
        );
    }
}

// Controller
@GetMapping("/products")
public ResponseEntity<Page<Product>> getProducts(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "name") String sortBy,
        @RequestParam(defaultValue = "ASC") String direction) {
    
    Page<Product> products = productService.getProducts(page, size, sortBy, direction);
    return ResponseEntity.ok(products);
}
```

#### Projections
```java
// Interface-based projection
public interface UserProjection {
    String getUsername();
    String getEmail();
    LocalDateTime getCreatedAt();
}

// Class-based projection (DTO)
public class UserSummary {
    private String username;
    private String email;
    
    public UserSummary(String username, String email) {
        this.username = username;
        this.email = email;
    }
    
    // Getters
}

// Dynamic projection
public interface UserRepository extends JpaRepository<User, Long> {
    
    <T> T findByUsername(String username, Class<T> type);
    
    <T> List<T> findByStatus(UserStatus status, Class<T> type);
}

// Usage
UserProjection projection = userRepository.findByUsername("john", UserProjection.class);
UserSummary summary = userRepository.findByUsername("john", UserSummary.class);
User entity = userRepository.findByUsername("john", User.class);
```

#### Interview Questions
**Intermediate**: How do derived query methods work in Spring Data JPA?
**Advanced**: Explain the N+1 problem and how to solve it with Spring Data JPA.
**Expert**: How does Spring Data JPA implement repositories at runtime?

#### Query Optimization Scenario
"You have a Product entity with Category (ManyToOne) and Reviews (OneToMany). You need to display products with their category names and review counts. How would you optimize the query?"

**Answer**: "I would:
1. Use `@EntityGraph` to specify fetch joins
2. Create a projection with only needed fields
3. Use `@Query` with JOIN FETCH to avoid N+1 queries
4. Consider caching category data if it doesn't change often
5. Use pagination to limit result size

Example:
```java
@EntityGraph(attributePaths = {"category"})
@Query("SELECT p FROM Product p LEFT JOIN p.reviews r " +
       "GROUP BY p.id, p.category.id")
Page<ProductWithStats> findProductsWithStats(Pageable pageable);
```"

### 🟡 8.4 Entity Relationships and Mapping

#### Relationship Types and Annotations
```java
// One-to-One (shared primary key)
@Entity
public class User {
    
    @Id
    private Long id;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private UserProfile profile;
}

@Entity
public class UserProfile {
    
    @Id
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId  // Shares primary key with User
    @JoinColumn(name = "id")
    private User user;
}

// One-to-Many (unidirectional)
@Entity
public class ShoppingCart {
    
    @Id
    private Long id;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cart_id")  // Foreign key in CartItem table
    private List<CartItem> items = new ArrayList<>();
}

// One-to-Many (bidirectional with join table)
@Entity
public class Author {
    
    @Id
    private Long id;
    
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
        name = "author_book",
        joinColumns = @JoinColumn(name = "author_id"),
        inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private Set<Book> books = new HashSet<>();
    
    // Helper method for bidirectional synchronization
    public void addBook(Book book) {
        books.add(book);
        book.getAuthors().add(this);
    }
    
    public void removeBook(Book book) {
        books.remove(book);
        book.getAuthors().remove(this);
    }
}

@Entity
public class Book {
    
    @Id
    private Long id;
    
    @ManyToMany(mappedBy = "books")
    private Set<Author> authors = new HashSet<>();
}
```

#### Cascade Types
```java
@Entity
public class Order {
    
    @Id
    private Long id;
    
    // Cascade operations from Order to OrderItems
    @OneToMany(mappedBy = "order", cascade = {
        CascadeType.PERSIST,   // Save order saves items
        CascadeType.MERGE,     // Update order updates items
        CascadeType.REMOVE     // Delete order deletes items
    }, orphanRemoval = true)   // Remove items when removed from collection
    private List<OrderItem> items = new ArrayList<>();
}

// CascadeType options:
// - ALL: All operations cascade
// - PERSIST: Save parent saves children
// - MERGE: Update parent updates children
// - REMOVE: Delete parent deletes children
// - REFRESH: Refresh parent refreshes children
// - DETACH: Detach parent detaches children
```

#### Fetch Strategies and Performance
```java
@Entity
@NamedEntityGraph(
    name = "Order.withItems",
    attributeNodes = @NamedAttributeNode("items")
)
public class Order {
    
    @Id
    private Long id;
    
    // Default fetch type for @OneToMany is LAZY
    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> items;
    
    // Default fetch type for @ManyToOne is EAGER  
    @ManyToOne(fetch = FetchType.EAGER)
    private Customer customer;
}

// Using EntityGraph in repository
@EntityGraph("Order.withItems")
@Query("SELECT o FROM Order o WHERE o.id = :id")
Optional<Order> findByIdWithItems(@Param("id") Long id);

// Dynamic entity graph
@EntityGraph(attributePaths = {"items", "customer"})
List<Order> findByStatus(OrderStatus status);
```

#### Inheritance Strategies
```java
// Single Table (default)
@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "payment_type", discriminatorType = DiscriminatorType.STRING)
public abstract class Payment {
    
    @Id
    private Long id;
    private BigDecimal amount;
}

@Entity
@DiscriminatorValue("CREDIT_CARD")
public class CreditCardPayment extends Payment {
    private String cardNumber;
    private String expiryDate;
}

@Entity
@DiscriminatorValue("PAYPAL")
public class PayPalPayment extends Payment {
    private String paypalEmail;
    private String transactionId;
}

// Table Per Class
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class Vehicle {
    
    @Id
    private Long id;
    private String manufacturer;
}

@Entity
public class Car extends Vehicle {
    private int doors;
    private String fuelType;
}

@Entity
public class Truck extends Vehicle {
    private int loadCapacity;
    private int axles;
}

// Joined Table
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Employee {
    
    @Id
    private Long id;
    private String name;
    private LocalDate hireDate;
}

@Entity
@PrimaryKeyJoinColumn(name = "employee_id")
public class FullTimeEmployee extends Employee {
    private BigDecimal salary;
    private BigDecimal pensionContribution;
}

@Entity
@PrimaryKeyJoinColumn(name = "employee_id")
public class PartTimeEmployee extends Employee {
    private BigDecimal hourlyRate;
    private int hoursPerWeek;
}
```

#### Embedded and Embeddable
```java
// Embeddable class
@Embeddable
@Data
public class Address {
    
    @Column(name = "street")
    private String street;
    
    @Column(name = "city")
    private String city;
    
    @Column(name = "zip_code")
    private String zipCode;
    
    @Column(name = "country")
    private String country;
}

// Entity using embedded class
@Entity
public class User {
    
    @Id
    private Long id;
    
    @Embedded
    private Address homeAddress;
    
    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "street", column = @Column(name = "work_street")),
        @AttributeOverride(name = "city", column = @Column(name = "work_city")),
        @AttributeOverride(name = "zipCode", column = @Column(name = "work_zip_code")),
        @AttributeOverride(name = "country", column = @Column(name = "work_country"))
    })
    private Address workAddress;
}
```

#### Interview Questions
**Intermediate**: What are the different cascade types and when would you use them?
**Advanced**: Compare the three inheritance strategies in JPA.
**Expert**: How would you map a many-to-many relationship with additional attributes?

#### Complex Mapping Scenario
"You need to model a university system with Students, Courses, and Enrollments. Each enrollment has a grade and enrollment date. How would you design the entities?"

**Answer**: "I would use a join entity approach:
1. Create Student and Course entities
2. Create Enrollment entity with `@ManyToOne` to Student and Course
3. Add grade and enrollmentDate fields to Enrollment
4. Use composite primary key (studentId + courseId) or separate ID
5. Implement equals/hashCode based on business key

This avoids the limitations of `@ManyToMany` and allows additional attributes on the relationship."

### 🟡 8.5 Query Methods and JPQL

#### JPQL vs SQL
```java
// JPQL (Java Persistence Query Language)
@Query("SELECT u FROM User u WHERE u.status = :status AND u.createdAt > :date")
List<User> findActiveUsersSince(@Param("date") LocalDateTime date, 
                               @Param("status") UserStatus status);

// SQL (Native query)
@Query(value = "SELECT * FROM users u WHERE u.status = :status " +
               "AND u.created_at > :date", nativeQuery = true)
List<User> findActiveUsersSinceNative(@Param("date") LocalDateTime date,
                                     @Param("status") String status);

// Differences:
// - JPQL: Entity-based, portable, type-safe
// - SQL: Database-specific, more control, less portable
```

#### JPQL Features
```java
// Basic SELECT
@Query("SELECT u FROM User u WHERE u.email LIKE '%@gmail.com'")

// JOIN operations
@Query("SELECT o FROM Order o JOIN o.customer c WHERE c.country = :country")

// LEFT JOIN
@Query("SELECT d FROM Department d LEFT JOIN FETCH d.employees")

// Aggregate functions
@Query("SELECT AVG(p.price) FROM Product p WHERE p.category = :category")

// GROUP BY and HAVING
@Query("SELECT c.country, COUNT(o) FROM Customer c JOIN c.orders o " +
       "GROUP BY c.country HAVING COUNT(o) > 10")

// Subqueries
@Query("SELECT p FROM Product p WHERE p.price > " +
       "(SELECT AVG(p2.price) FROM Product p2 WHERE p2.category = p.category)")

// CASE expressions
@Query("SELECT u, CASE WHEN u.status = 'ACTIVE' THEN 'Yes' ELSE 'No' END " +
       "FROM User u")

// COALESCE and NULLIF
@Query("SELECT COALESCE(u.middleName, '') FROM User u")
@Query("SELECT NULLIF(u.username, 'admin') FROM User u")
```

#### Dynamic Queries with Criteria API
```java
@Repository
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {
    
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public List<Product> searchProducts(ProductSearchCriteria criteria) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<Product> query = cb.createQuery(Product.class);
        Root<Product> product = query.from(Product.class);
        
        List<Predicate> predicates = new ArrayList<>();
        
        if (criteria.getName() != null) {
            predicates.add(cb.like(product.get("name"), "%" + criteria.getName() + "%"));
        }
        
        if (criteria.getMinPrice() != null) {
            predicates.add(cb.ge(product.get("price"), criteria.getMinPrice()));
        }
        
        if (criteria.getMaxPrice() != null) {
            predicates.add(cb.le(product.get("price"), criteria.getMaxPrice()));
        }
        
        if (criteria.getCategory() != null) {
            predicates.add(cb.equal(product.get("category"), criteria.getCategory()));
        }
        
        query.where(predicates.toArray(new Predicate[0]));
        
        if (criteria.getSortBy() != null) {
            if ("price".equals(criteria.getSortBy())) {
                query.orderBy(criteria.isAscending() 
                    ? cb.asc(product.get("price")) 
                    : cb.desc(product.get("price")));
            }
        }
        
        return entityManager.createQuery(query)
            .setFirstResult(criteria.getOffset())
            .setMaxResults(criteria.getLimit())
            .getResultList();
    }
}

// Using Specification (Spring Data JPA)
public class ProductSpecification implements Specification<Product> {
    
    private final ProductSearchCriteria criteria;
    
    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, 
                                CriteriaBuilder cb) {
        
        List<Predicate> predicates = new ArrayList<>();
        
        if (criteria.getName() != null) {
            predicates.add(cb.like(root.get("name"), "%" + criteria.getName() + "%"));
        }
        
        if (criteria.getCategory() != null) {
            predicates.add(cb.equal(root.get("category"), criteria.getCategory()));
        }
        
        return cb.and(predicates.toArray(new Predicate[0]));
    }
}

// Repository with JpaSpecificationExecutor
public interface ProductRepository extends JpaRepository<Product, Long>, 
                                          JpaSpecificationExecutor<Product> {
    
    List<Product> findAll(Specification<Product> spec);
    Page<Product> findAll(Specification<Product> spec, Pageable pageable);
}

// Usage
Specification<Product> spec = new ProductSpecification(criteria);
Page<Product> products = productRepository.findAll(spec, pageable);
```

#### Query Projections
```java
// Interface projection
public interface ProductView {
    String getName();
    BigDecimal getPrice();
    String getCategoryName();
    
    // Nested projection
    ManufacturerInfo getManufacturer();
    
    interface ManufacturerInfo {
        String getName();
        String getCountry();
    }
}

// Class-based projection (DTO)
public class ProductDTO {
    private final String name;
    private final BigDecimal price;
    private final String category;
    
    public ProductDTO(String name, BigDecimal price, String category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
    
    // Getters
}

// Constructor expression in JPQL
@Query("SELECT new com.example.dto.ProductDTO(p.name, p.price, p.category.name) " +
       "FROM Product p WHERE p.price > :minPrice")
List<ProductDTO> findExpensiveProducts(@Param("minPrice") BigDecimal minPrice);

// Tuple projection
@Query("SELECT p.name as name, p.price as price, c.name as categoryName " +
       "FROM Product p JOIN p.category c")
List<Tuple> findProductTuples();

// Usage
List<Tuple> tuples = repository.findProductTuples();
tuples.forEach(tuple -> {
    String name = tuple.get("name", String.class);
    BigDecimal price = tuple.get("price", BigDecimal.class);
});
```

#### Interview Questions
**Intermediate**: What are the advantages of JPQL over native SQL?
**Advanced**: How does the Criteria API help with dynamic queries?
**Expert**: Compare Specification API with Criteria API.

#### Query Optimization Scenario
"You have a reporting query that joins 5 tables and returns thousands of rows. How would you optimize it?"

**Answer**: "I would:
1. Use native SQL for database-specific optimizations
2. Create database indexes on join columns and filter columns
3. Use pagination to limit result size
4. Consider materialized views for frequently run reports
5. Use projection to select only needed columns
6. Implement caching for repeated identical queries
7. Consider batch processing for large datasets
8. Use EXPLAIN ANALYZE to understand query plan"

---

*[The guide continues with transaction management, Spring Security, testing, advanced topics, and comprehensive interview preparation sections...]*


## 9. Transaction Management

### 🟢 9.1 Understanding Transactions

#### What is a Transaction?
A transaction is a sequence of operations performed as a single logical unit of work that must either complete entirely or not at all (ACID properties).

#### ACID Properties
1. **Atomicity**: All operations succeed or all fail
2. **Consistency**: Database remains in consistent state
3. **Isolation**: Transactions don't interfere with each other
4. **Durability**: Committed changes persist

#### Spring Transaction Management
Spring provides two approaches:
1. **Programmatic**: Manual transaction control
2. **Declarative**: Using `@Transactional` annotation (recommended)

#### `@Transactional` Annotation
```java
@Service
public class OrderService {
    
    @Transactional
    public Order createOrder(OrderRequest request) {
        // 1. Create order
        Order order = orderRepository.save(createOrderEntity(request));
        
        // 2. Update inventory
        inventoryService.updateStock(request.getItems());
        
        // 3. Process payment
        paymentService.processPayment(request.getPayment());
        
        // 4. Send notification
        notificationService.sendOrderConfirmation(order);
        
        return order;
        // All operations succeed or rollback together
    }
    
    @Transactional(readOnly = true)
    public Order getOrder(Long id) {
        // Read-only transaction (optimizations apply)
        return orderRepository.findById(id)
            .orElseThrow(() -> new OrderNotFoundException(id));
    }
    
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void auditOrder(Long orderId) {
        // Always creates new transaction
        auditRepository.logAction("ORDER_VIEWED", orderId);
    }
}
```

#### Transaction Propagation Levels
```java
public enum Propagation {
    
    // Default: Use existing transaction or create new
    REQUIRED,
    
    // Always create new transaction
    REQUIRES_NEW,
    
    // Use existing transaction, execute non-transactionally if none exists
    SUPPORTS,
    
    // Must have existing transaction
    MANDATORY,
    
    // Never execute within transaction
    NEVER,
    
    // Execute non-transactionally, suspend existing if present
    NOT_SUPPORTED,
    
    // Execute non-transactionally, fail if transaction exists
    NESTED  // Savepoint-based nested transaction
}
```

#### Isolation Levels
```java
public enum Isolation {
    
    DEFAULT,  // Use database default
    
    READ_UNCOMMITTED,  // Dirty reads allowed
    
    READ_COMMITTED,    // No dirty reads (default for most databases)
    
    REPEATABLE_READ,   // No dirty or non-repeatable reads
    
    SERIALIZABLE       // Fully serialized (prevents phantom reads)
}

// Common isolation issues:
// 1. Dirty Read: Reading uncommitted changes
// 2. Non-Repeatable Read: Different values in same transaction
// 3. Phantom Read: New rows appear in subsequent reads
```

#### Transaction Configuration
```java
@Transactional(
    propagation = Propagation.REQUIRED,
    isolation = Isolation.READ_COMMITTED,
    timeout = 30,  // seconds
    readOnly = false,
    rollbackFor = {BusinessException.class, DataAccessException.class},
    noRollbackFor = {ValidationException.class}
)
public void processOrder(Order order) {
    // Transaction with specific configuration
}
```

#### Interview Questions
**Beginner**: What are the ACID properties of transactions?
**Intermediate**: Explain different transaction propagation levels.
**Advanced**: When would you use `REQUIRES_NEW` vs `NESTED` propagation?

#### Transaction Scenario
"You're processing a financial transaction that involves deducting from one account and crediting to another. How would you ensure data consistency?"

**Answer**: "I would use `@Transactional` to ensure atomicity. Both operations must succeed or both fail. I'd use `READ_COMMITTED` isolation to prevent dirty reads but allow concurrent transactions. For additional safety, I'd implement optimistic locking with `@Version` to prevent lost updates if the same account is modified concurrently."

### 🟡 9.2 Transactional Best Practices and Pitfalls

#### Common Transaction Pitfalls
```java
// 1. Calling @Transactional method from within same class
@Service
public class ProblematicService {
    
    public void processOrder(Order order) {
        // This won't work - self-invocation bypasses proxy
        updateInventory(order);  
    }
    
    @Transactional
    public void updateInventory(Order order) {
        // Transaction won't start when called from processOrder
        inventoryRepository.updateStock(order.getItems());
    }
    
    // Solution: Use self-injection or move to separate class
    @Autowired
    private ProblematicService self;
    
    public void processOrderFixed(Order order) {
        self.updateInventory(order);  // Works via proxy
    }
}

// 2. Long-running transactions
@Transactional
public void processLargeBatch(List<Data> dataList) {
    for (Data data : dataList) {
        processSingleItem(data);  // Transaction grows with each iteration
    }
    // Better: Process in chunks or use batch processing
}

// 3. Mixing read-write and read-only operations
@Transactional
public Order getOrderWithUpdates(Long id) {
    Order order = orderRepository.findById(id);  // Read
    order.setStatus(OrderStatus.PROCESSED);      // Write
    return orderRepository.save(order);          // Write
    // Problem: Read operation in write transaction
}

// 4. Exception handling issues
@Transactional
public void processPayment(Payment payment) {
    try {
        paymentService.process(payment);
        auditService.logPayment(payment);
    } catch (PaymentException e) {
        // Caught exception prevents rollback!
        log.error("Payment failed", e);
    }
    // Solution: Re-throw or use rollbackFor
}

// 5. Database lock contention
@Transactional(isolation = Isolation.SERIALIZABLE)
public void updateCriticalResource(Long id) {
    // May cause deadlocks or poor performance
    // Better: Use optimistic locking or shorter transactions
}
```

#### Transaction Best Practices
```java
// 1. Keep transactions short
@Transactional
public void processOrder(Order order) {
    // Do minimal work in transaction
    validateOrder(order);
    Order savedOrder = saveOrder(order);
    
    // Move non-critical operations outside transaction
    eventPublisher.publishEvent(new OrderCreatedEvent(savedOrder));
    sendNotification(savedOrder);
}

// 2. Use appropriate isolation level
@Transactional(isolation = Isolation.READ_COMMITTED)
public void transferMoney(Account from, Account to, BigDecimal amount) {
    // READ_COMMITTED is usually sufficient
    from.debit(amount);
    to.credit(amount);
    accountRepository.saveAll(List.of(from, to));
}

// 3. Handle exceptions properly
@Transactional(rollbackFor = {BusinessException.class, DataAccessException.class})
public void processOrder(Order order) throws BusinessException {
    try {
        // Business logic
    } catch (DataAccessException e) {
        // Database errors trigger rollback
        throw new BusinessException("Database error", e);
    }
}

// 4. Use read-only transactions for queries
@Transactional(readOnly = true)
public Page<Order> searchOrders(OrderSearchCriteria criteria, Pageable pageable) {
    // Read-only optimizations apply
    return orderRepository.search(criteria, pageable);
}

// 5. Consider transaction timeout
@Transactional(timeout = 10)
public void processBatch(List<Data> batch) {
    // Fails if takes longer than 10 seconds
    batch.forEach(this::processItem);
}
```

#### Programmatic Transaction Management
```java
@Service
public class ManualTransactionService {
    
    private final PlatformTransactionManager transactionManager;
    private final OrderRepository orderRepository;
    
    public Order createOrderWithManualTx(OrderRequest request) {
        // Define transaction attributes
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        def.setIsolationLevel(TransactionDefinition.ISOLATION_READ_COMMITTED);
        def.setTimeout(30);
        
        // Start transaction
        TransactionStatus status = transactionManager.getTransaction(def);
        
        try {
            // Business logic
            Order order = createOrder(request);
            updateInventory(request.getItems());
            processPayment(request.getPayment());
            
            // Commit transaction
            transactionManager.commit(status);
            return order;
            
        } catch (Exception e) {
            // Rollback on exception
            transactionManager.rollback(status);
            throw new BusinessException("Order creation failed", e);
        }
    }
    
    // Using TransactionTemplate
    @Autowired
    private TransactionTemplate transactionTemplate;
    
    public Order createOrderWithTemplate(OrderRequest request) {
        return transactionTemplate.execute(status -> {
            Order order = createOrder(request);
            updateInventory(request.getItems());
            processPayment(request.getPayment());
            return order;
        });
    }
}
```

#### Distributed Transactions
```java
// Using JTA for distributed transactions (multiple resources)
@Configuration
@EnableTransactionManagement
@EnableJta  // Requires JTA implementation (Atomikos, Bitronix)
public class JtaConfig {
    
    @Bean
    public JtaTransactionManager transactionManager() {
        return new JtaTransactionManager();
    }
}

@Service
public class DistributedService {
    
    @Transactional
    public void processDistributedOrder(Order order) {
        // Update local database
        orderRepository.save(order);
        
        // Call external service (in same transaction)
        inventoryService.updateStock(order.getItems());
        
        // Send message to message queue
        jmsTemplate.convertAndSend("orders.queue", order);
        
        // All participate in same distributed transaction
    }
}

// Considerations for distributed transactions:
// 1. Performance overhead
// 2. Complexity of setup and debugging
// 3. Consider eventual consistency patterns instead
```

#### Interview Questions
**Intermediate**: What are common pitfalls with Spring transactions?
**Advanced**: When would you use programmatic vs declarative transactions?
**Expert**: How does Spring handle transaction rollback for checked vs unchecked exceptions?

#### Performance Optimization Scenario
"You have a batch processing job that updates 10,000 records. The current implementation uses a single transaction for all updates, causing memory issues and timeout errors. How would you optimize this?"

**Answer**: "I would:
1. Implement chunk-based processing with separate transactions per chunk
2. Use batch updates with `JdbcTemplate.batchUpdate()` or `EntityManager.getTransaction().begin()` per batch
3. Clear persistence context periodically with `EntityManager.clear()`
4. Use `StatelessSession` for bulk operations
5. Consider using Spring Batch for complex batch processing
6. Implement retry logic with exponential backoff for transient failures
7. Monitor and adjust batch size based on memory and performance metrics"

### 🟡 9.3 Transaction Isolation and Locking

#### Isolation Levels in Practice
```java
// READ_UNCOMMITTED (Dirty reads allowed)
@Transactional(isolation = Isolation.READ_UNCOMMITTED)
public BigDecimal getAccountBalanceUnsafe(Long accountId) {
    // May read uncommitted changes from other transactions
    return accountRepository.findBalance(accountId);
}

// READ_COMMITTED (Default for most databases)
@Transactional(isolation = Isolation.READ_COMMITTED)
public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
    Account from = accountRepository.findById(fromId);
    Account to = accountRepository.findById(toId);
    
    // Cannot read uncommitted changes
    // But non-repeatable reads possible
    from.debit(amount);
    to.credit(amount);
    
    accountRepository.save(from);
    accountRepository.save(to);
}

// REPEATABLE_READ
@Transactional(isolation = Isolation.REPEATABLE_READ)
public void processOrder(Order order) {
    // Locks prevent other transactions from modifying read rows
    // Prevents non-repeatable reads
    // Phantom reads still possible
    validateInventory(order);
    processOrderItems(order);
}

// SERIALIZABLE
@Transactional(isolation = Isolation.SERIALIZABLE)
public void criticalFinancialOperation() {
    // Complete isolation
    // May cause deadlocks and performance issues
    // Use only when absolutely necessary
}
```

#### Optimistic Locking
```java
// Entity with version field
@Entity
public class Account {
    
    @Id
    private Long id;
    private BigDecimal balance;
    
    @Version
    private Integer version;  // Automatically incremented on update
    
    // Methods that modify state
    public void debit(BigDecimal amount) {
        if (balance.compareTo(amount) < 0) {
            throw new InsufficientFundsException();
        }
        balance = balance.subtract(amount);
    }
}

// Service using optimistic locking
@Service
public class AccountService {
    
    @Transactional
    public void transferMoney(Long fromId, Long toId, BigDecimal amount) {
        Account from = accountRepository.findById(fromId)
            .orElseThrow(() -> new AccountNotFoundException(fromId));
        Account to = accountRepository.findById(toId)
            .orElseThrow(() -> new AccountNotFoundException(toId));
        
        from.debit(amount);
        to.credit(amount);
        
        try {
            accountRepository.saveAll(List.of(from, to));
        } catch (OptimisticLockingFailureException e) {
            // Another transaction modified the data
            throw new ConcurrentModificationException("Account modified concurrently", e);
        }
    }
}

// Custom retry logic for optimistic locking
@Retryable(value = OptimisticLockingFailureException.class, maxAttempts = 3)
@Transactional
public void updateWithRetry(Long accountId, BigDecimal amount) {
    Account account = accountRepository.findById(accountId)
        .orElseThrow(() -> new AccountNotFoundException(accountId));
    
    account.adjustBalance(amount);
    accountRepository.save(account);
}
```

#### Pessimistic Locking
```java
// Using pessimistic locks in repository
public interface AccountRepository extends JpaRepository<Account, Long> {
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Optional<Account> findByIdForUpdate(@Param("id") Long id);
    
    @Lock(LockModeType.PESSIMISTIC_READ)
    @Query("SELECT a FROM Account a WHERE a.id = :id")
    Optional<Account> findByIdForShare(@Param("id") Long id);
}

// Service using pessimistic locking
@Service
public class AccountService {
    
    @Transactional
    public void transferMoneyWithPessimisticLock(Long fromId, Long toId, BigDecimal amount) {
        // Acquire write lock on both accounts
        Account from = accountRepository.findByIdForUpdate(fromId)
            .orElseThrow(() -> new AccountNotFoundException(fromId));
        Account to = accountRepository.findByIdForUpdate(toId)
            .orElseThrow(() -> new AccountNotFoundException(toId));
        
        // Perform transfer (other transactions blocked)
        from.debit(amount);
        to.credit(amount);
        
        accountRepository.saveAll(List.of(from, to));
    }
}

// Lock timeout configuration
@Transactional
public void transferWithTimeout(Long fromId, Long toId, BigDecimal amount) {
    // Set lock timeout (database-specific)
    entityManager.createNativeQuery("SET LOCK_TIMEOUT 5000").executeUpdate();
    
    try {
        Account from = accountRepository.findByIdForUpdate(fromId);
        Account to = accountRepository.findByIdForUpdate(toId);
        
        from.debit(amount);
        to.credit(amount);
        
        accountRepository.saveAll(List.of(from, to));
    } catch (PessimisticLockException e) {
        throw new BusinessException("Could not acquire lock within timeout", e);
    }
}
```

#### Deadlock Prevention and Handling
```java
@Service
public class DeadlockAwareService {
    
    // 1. Consistent ordering of resource access
    @Transactional
    public void transferMoneySafe(Long account1Id, Long account2Id, BigDecimal amount) {
        // Always lock accounts in consistent order (by ID)
        Long firstId = Math.min(account1Id, account2Id);
        Long secondId = Math.max(account1Id, account2Id);
        
        Account first = accountRepository.findByIdForUpdate(firstId);
        Account second = accountRepository.findByIdForUpdate(secondId);
        
        // Perform transfer
        if (account1Id.equals(firstId)) {
            first.debit(amount);
            second.credit(amount);
        } else {
            second.debit(amount);
            first.credit(amount);
        }
        
        accountRepository.saveAll(List.of(first, second));
    }
    
    // 2. Timeout and retry
    @Retryable(
        value = {PessimisticLockException.class, LockTimeoutException.class},
        maxAttempts = 3,
        backoff = @Backoff(delay = 100, multiplier = 2)
    )
    @Transactional
    public void updateWithDeadlockRetry(Long accountId, BigDecimal amount) {
        Account account = accountRepository.findByIdForUpdate(accountId)
            .orElseThrow(() -> new AccountNotFoundException(accountId));
        
        account.adjustBalance(amount);
        accountRepository.save(account);
    }
    
    // 3. Use optimistic locking instead
    @Transactional
    public void updateWithOptimisticLock(Long accountId, BigDecimal amount) {
        boolean updated = false;
        int attempts = 0;
        
        while (!updated && attempts < 3) {
            try {
                Account account = accountRepository.findById(accountId)
                    .orElseThrow(() -> new AccountNotFoundException(accountId));
                
                account.adjustBalance(amount);
                accountRepository.save(account);
                updated = true;
                
            } catch (OptimisticLockingFailureException e) {
                attempts++;
                if (attempts >= 3) {
                    throw new BusinessException("Failed after 3 retries", e);
                }
                // Wait briefly before retry
                try { Thread.sleep(100 * attempts); } catch (InterruptedException ie) {}
            }
        }
    }
}
```

#### Interview Questions
**Intermediate**: What is optimistic locking and how does it work?
**Advanced**: Compare optimistic vs pessimistic locking strategies.
**Expert**: How would you handle deadlocks in a high-concurrency system?

#### Concurrency Scenario
"You're building a ticket booking system where multiple users can try to book the same seats simultaneously. How would you prevent double-booking?"

**Answer**: "I would use optimistic locking with versioning:
1. Add `@Version` field to Seat entity
2. When booking, read seat with current version
3. Attempt to update with `seat.setBooked(true)`
4. If `OptimisticLockingFailureException` occurs, someone else booked it
5. Return appropriate error to user

For better UX, I might also:
- Implement a short-term reservation system (hold seats for 5 minutes)
- Use database constraints (UNIQUE constraint on booked seats)
- Implement a queue system for high-demand events
- Consider using Redis for distributed locking if scaling horizontally"

---

*[The guide continues with Spring Security, testing, logging, advanced concepts, microservices, and comprehensive interview preparation...]*


## 10. Spring Security

### 🟢 10.1 Spring Security Fundamentals

#### What is Spring Security?
Spring Security is a powerful and highly customizable authentication and access-control framework for Java applications.

#### Core Concepts
1. **Authentication**: Verifying who you are
2. **Authorization**: Determining what you're allowed to do
3. **Principal**: Currently authenticated user
4. **GrantedAuthority**: Permission/role granted to principal
5. **SecurityContext**: Holds authentication information

#### Basic Security Configuration
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/", "/home", "/public/**").permitAll()
                .requestMatchers("/admin/**").hasRole("ADMIN")
                .requestMatchers("/user/**").hasAnyRole("USER", "ADMIN")
                .requestMatchers("/api/**").authenticated()
                .anyRequest().authenticated()
            )
            .formLogin(form -> form
                .loginPage("/login")
                .defaultSuccessUrl("/dashboard")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login?logout")
                .permitAll()
            )
            .rememberMe(remember -> remember
                .tokenValiditySeconds(7 * 24 * 60 * 60) // 7 days
            );
        
        return http.build();
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user = User.withDefaultPasswordEncoder()
            .username("user")
            .password("password")
            .roles("USER")
            .build();
        
        UserDetails admin = User.withDefaultPasswordEncoder()
            .username("admin")
            .password("admin")
            .roles("USER", "ADMIN")
            .build();
        
        return new InMemoryUserDetailsManager(user, admin);
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

#### Authentication Mechanisms
```java
// 1. Form-based authentication (default)
.formLogin(form -> form
    .loginPage("/login")
    .loginProcessingUrl("/perform_login")
    .defaultSuccessUrl("/dashboard", true)
    .failureUrl("/login?error=true")
    .usernameParameter("email")
    .passwordParameter("pass")
)

// 2. HTTP Basic authentication
.httpBasic(Customizer.withDefaults())

// 3. OAuth2/OpenID Connect
.oauth2Login(oauth2 -> oauth2
    .loginPage("/login")
    .defaultSuccessUrl("/dashboard")
    .userInfoEndpoint(userInfo -> userInfo
        .userService(customOAuth2UserService)
    )
)

// 4. JWT authentication (custom filter)
.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)

// 5. LDAP authentication
.ldapAuthentication()
    .userDnPatterns("uid={0},ou=people")
    .groupSearchBase("ou=groups")
```

#### Authorization Expressions
```java
// Method-level security
@PreAuthorize("hasRole('ADMIN')")
@PostAuthorize("returnObject.owner == authentication.name")
@Secured({"ROLE_ADMIN", "ROLE_SUPER_ADMIN"})
@RolesAllowed({"USER", "ADMIN"})

// Common expressions:
// - hasRole('ROLE_ADMIN') / hasAuthority('ADMIN')
// - hasAnyRole('ROLE_USER', 'ROLE_ADMIN')
// - hasIpAddress('192.168.1.0/24')
// - isAuthenticated() / isAnonymous() / isFullyAuthenticated()
// - principal / authentication
// - #variable (method parameter)

// Custom expressions
@PreAuthorize("@securityService.canAccessOrder(#orderId)")
public Order getOrder(Long orderId) {
    return orderRepository.findById(orderId).orElseThrow();
}

@Component("securityService")
public class SecurityService {
    
    public boolean canAccessOrder(Long orderId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Order order = orderRepository.findById(orderId).orElseThrow();
        return order.getCustomer().getUsername().equals(auth.getName());
    }
}
```

#### Interview Questions
**Beginner**: What is the difference between authentication and authorization?
**Intermediate**: Explain the Spring Security filter chain.
**Advanced**: How does Spring Security handle session management?

#### Security Scenario
"You're building a banking application. What security measures would you implement?"

**Answer**: "I would implement:
1. HTTPS enforcement for all endpoints
2. Strong password policies with BCrypt encoding
3. Multi-factor authentication for sensitive operations
4. Session management with timeout and concurrent session control
5. CSRF protection for state-changing operations
6. Rate limiting to prevent brute force attacks
7. Audit logging for security events
8. Regular security headers (CSP, HSTS, X-Frame-Options)
9. Input validation and SQL injection prevention
10. Regular security dependency scanning"

### 🟡 10.2 JWT Authentication

#### What is JWT?
JSON Web Token (JWT) is an open standard for securely transmitting information between parties as a JSON object.

#### JWT Structure
```
Header.Payload.Signature

Example:
Header: {"alg": "HS256", "typ": "JWT"}
Payload: {"sub": "1234567890", "name": "John Doe", "iat": 1516239022}
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
```

#### JWT Authentication Flow
1. Client sends credentials to `/api/auth/login`
2. Server validates credentials and generates JWT
3. Server returns JWT to client
4. Client includes JWT in Authorization header for subsequent requests
5. Server validates JWT on each request

#### JWT Configuration
```java
@Configuration
public class JwtConfig {
    
    @Value("${jwt.secret}")
    private String secret;
    
    @Value("${jwt.expiration}")
    private Long expiration;
    
    @Bean
    public JwtEncoder jwtEncoder() {
        return new NimbusJwtEncoder(new ImmutableSecret<>(secret.getBytes()));
    }
    
    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(new SecretKeySpec(
            secret.getBytes(), "HmacSHA256")).build();
    }
    
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
        converter.setAuthorityPrefix("ROLE_");
        converter.setAuthoritiesClaimName("roles");
        
        JwtAuthenticationConverter jwtConverter = new JwtAuthenticationConverter();
        jwtConverter.setJwtGrantedAuthoritiesConverter(converter);
        return jwtConverter;
    }
}
```

#### JWT Filter Implementation
```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                   HttpServletResponse response,
                                   FilterChain filterChain) throws ServletException, IOException {
        
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        
        jwt = authHeader.substring(7);
        username = jwtService.extractUsername(jwt);
        
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authToken = 
                    new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                    );
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);
    }
}

@Service
public class JwtService {
    
    private final String secretKey;
    private final long jwtExpiration;
    private final long refreshExpiration;
    
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }
    
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }
    
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshExpiration);
    }
    
    private String buildToken(Map<String, Object> extraClaims,
                             UserDetails userDetails,
                             long expiration) {
        return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + expiration))
            .signWith(getSignInKey(), SignatureAlgorithm.HS256)
            .compact();
    }
    
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }
    
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
            .setSigningKey(getSignInKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
    }
    
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

#### Refresh Token Implementation
```java
@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
    
    private final AuthenticationService authService;
    
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }
    
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }
    
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestBody LogoutRequest request) {
        authService.logout(request);
        return ResponseEntity.ok().build();
    }
}

@Service
public class AuthenticationService {
    
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserRepository userRepository;
    
    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );
        
        var user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = refreshTokenService.createRefreshToken(user.getId());
        
        return AuthResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken.getToken())
            .build();
    }
    
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        return refreshTokenService.findByToken(request.getRefreshToken())
            .map(refreshTokenService::verifyExpiration)
            .map(RefreshToken::getUser)
            .map(user -> {
                String accessToken = jwtService.generateToken(user);
                return AuthResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(request.getRefreshToken())
                    .build();
            })
            .orElseThrow(() -> new RuntimeException("Refresh token not found"));
    }
}

@Entity
public class RefreshToken {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String token;
    
    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
    @Column(nullable = false)
    private Instant expiryDate;
}
```

#### Security Configuration with JWT
```java
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    
    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider)
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling(exceptions -> exceptions
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
            );
        
        return http.build();
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) 
            throws Exception {
        return config.getAuthenticationManager();
    }
}
```

#### Interview Questions
**Intermediate**: What are the advantages of JWT over session-based authentication?
**Advanced**: How do you handle JWT token revocation?
**Expert**: What security considerations are important for JWT implementation?

#### JWT Security Scenario
"You're implementing JWT for a mobile banking app. What security measures would you include?"

**Answer**: "For mobile banking with JWT:
1. Use strong signing algorithm (RS256 with asymmetric keys)
2. Implement short-lived access tokens (15-30 minutes)
3. Use refresh tokens with secure storage (HttpOnly, Secure cookies)
4. Implement token blacklisting/whitelisting for logout
5. Include device fingerprint in token claims
6. Implement rate limiting on token endpoints
7. Use HTTPS only for all communications
8. Store sensitive claims encrypted within JWT
9. Implement token binding to prevent token reuse
10. Regular security audits and penetration testing"

### 🟡 10.3 Role-Based Access Control (RBAC)

#### RBAC Implementation
```java
// Entity definitions
@Entity
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    private String password;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}

@Entity
public class Role {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    private RoleName name;
    
    private String description;
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "role_permissions",
        joinColumns = @JoinColumn(name = "role_id"),
        inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions = new HashSet<>();
}

@Entity
public class Permission {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String name;  // e.g., "USER_READ", "USER_WRITE", "ADMIN_DELETE"
    
    private String description;
}

public enum RoleName {
    ROLE_USER,
    ROLE_MODERATOR,
    ROLE_ADMIN,
    ROLE_SUPER_ADMIN
}
```

#### Custom UserDetailsService
```java
@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private final UserRepository userRepository;
    
    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
            .orElseThrow(() -> new UsernameNotFoundException(
                "User not found with username or email: " + usernameOrEmail));
        
        return UserPrincipal.builder()
            .id(user.getId())
            .username(user.getUsername())
            .email(user.getEmail())
            .password(user.getPassword())
            .authorities(getAuthorities(user.getRoles()))
            .accountNonExpired(true)
            .accountNonLocked(true)
            .credentialsNonExpired(true)
            .enabled(user.isEnabled())
            .build();
    }
    
    private Collection<? extends GrantedAuthority> getAuthorities(Set<Role> roles) {
        return getGrantedAuthorities(getPermissions(roles));
    }
    
    private Set<String> getPermissions(Set<Role> roles) {
        Set<String> permissions = new HashSet<>();
        
        for (Role role : roles) {
            permissions.add(role.getName().name());
            for (Permission permission : role.getPermissions()) {
                permissions.add(permission.getName());
            }
        }
        
        return permissions;
    }
    
    private List<GrantedAuthority> getGrantedAuthorities(Set<String> permissions) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String permission : permissions) {
            authorities.add(new SimpleGrantedAuthority(permission));
        }
        return authorities;
    }
}

@Builder
@Data
public class UserPrincipal implements UserDetails {
    
    private Long id;
    private String username;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;
    
    // Additional user information
    private String firstName;
    private String lastName;
    private LocalDateTime lastPasswordChange;
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }
    
    @Override
    public String getPassword() {
        return password;
    }
    
    @Override
    public String getUsername() {
        return username;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return accountNonExpired;
    }
    
    @Override
    public boolean isAccountNonLocked() {
        return accountNonLocked;
    }
    
    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }
    
    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
```

#### Method Security with RBAC
```java
@Configuration
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true, jsr250Enabled = true)
public class MethodSecurityConfig {
    
    @Bean
    public MethodSecurityExpressionHandler methodSecurityExpressionHandler() {
        DefaultMethodSecurityExpressionHandler expressionHandler = 
            new DefaultMethodSecurityExpressionHandler();
        expressionHandler.setPermissionEvaluator(new CustomPermissionEvaluator());
        return expressionHandler;
    }
}

@Component
public class CustomPermissionEvaluator implements PermissionEvaluator {
    
    @Override
    public boolean hasPermission(Authentication authentication, 
                                Object targetDomainObject, 
                                Object permission) {
        if (authentication == null || targetDomainObject == null || !(permission instanceof String)) {
            return false;
        }
        
        String targetType = targetDomainObject.getClass().getSimpleName().toUpperCase();
        return hasPrivilege(authentication, targetType, permission.toString());
    }
    
    @Override
    public boolean hasPermission(Authentication authentication, 
                                Serializable targetId, 
                                String targetType, 
                                Object permission) {
        if (authentication == null || targetType == null || !(permission instanceof String)) {
            return false;
        }
        
        return hasPrivilege(authentication, targetType.toUpperCase(), permission.toString());
    }
    
    private boolean hasPrivilege(Authentication auth, String targetType, String permission) {
        for (GrantedAuthority grantedAuth : auth.getAuthorities()) {
            if (grantedAuth.getAuthority().startsWith(targetType)) {
                if (grantedAuth.getAuthority().contains(permission)) {
                    return true;
                }
            }
        }
        return false;
    }
}

// Usage in service layer
@Service
public class UserService {
    
    @PreAuthorize("hasPermission(#userId, 'USER', 'READ')")
    public User getUser(Long userId) {
        return userRepository.findById(userId).orElseThrow();
    }
    
    @PreAuthorize("hasPermission(#user, 'WRITE')")
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    @PreAuthorize("hasRole('ADMIN') or @securityService.isResourceOwner(#resourceId, authentication.name)")
    public void deleteResource(Long resourceId) {
        resourceRepository.deleteById(resourceId);
    }
    
    @PostFilter("hasPermission(filterObject, 'READ')")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
```

#### Dynamic Permission Evaluation
```java
@Component("securityService")
public class SecurityService {
    
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    
    public boolean hasAccess(Long resourceId, String permissionName) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        
        if (auth == null || !auth.isAuthenticated()) {
            return false;
        }
        
        String username = auth.getName();
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        // Check if user has the required permission for this resource
        return permissionRepository.existsByUserAndResourceAndPermissionName(
            user.getId(), resourceId, permissionName);
    }
    
    public boolean isResourceOwner(Long resourceId, String username) {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        
        Resource resource = resourceRepository.findById(resourceId)
            .orElseThrow(() -> new ResourceNotFoundException(resourceId));
        
        return resource.getOwner().getId().equals(user.getId());
    }
    
    public boolean canAccessOrganization(Long orgId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        
        // Complex business logic for organization access
        return userRepository.hasAccessToOrganization(username, orgId);
    }
}

// Custom security expression
public class CustomSecurityExpressionRoot extends SecurityExpressionRoot {
    
    private final SecurityService securityService;
    
    public CustomSecurityExpressionRoot(Authentication authentication, 
                                       SecurityService securityService) {
        super(authentication);
        this.securityService = securityService;
    }
    
    public boolean hasAccess(Long resourceId, String permission) {
        return securityService.hasAccess(resourceId, permission);
    }
    
    public boolean isResourceOwner(Long resourceId) {
        return securityService.isResourceOwner(resourceId, this.getAuthentication().getName());
    }
    
    public boolean canAccessOrganization(Long orgId) {
        return securityService.canAccessOrganization(orgId);
    }
}
```

#### Interview Questions
**Intermediate**: What's the difference between roles and permissions in RBAC?
**Advanced**: How would you implement hierarchical roles (role inheritance)?
**Expert**: What are the performance considerations for permission evaluation?

#### RBAC Design Scenario
"You're designing an RBAC system for a multi-tenant SaaS application where each tenant can define their own roles and permissions. How would you design this?"

**Answer**: "I would design a flexible RBAC system with:
1. Tenant isolation at database level (tenant_id on all tables)
2. Dynamic role and permission management per tenant
3. Role inheritance hierarchy within each tenant
4. Permission groups for common sets of permissions
5. Time-based role assignments (temporary permissions)
6. Audit logging for all permission changes
7. Bulk permission assignment for user groups
8. API for tenant administrators to manage their RBAC
9. Caching layer for frequently checked permissions
10. Support for custom permission evaluation logic per tenant"

---

*[The guide continues with testing, logging, monitoring, advanced Spring concepts, microservices, production deployment, performance optimization, and comprehensive interview preparation sections...]*


## 11. Testing in Spring Boot

### 🟢 11.1 Unit Testing with JUnit 5 and Mockito

#### Testing Fundamentals
```java
// Basic JUnit 5 test structure
import org.junit.jupiter.api.*;

class UserServiceTest {
    
    @BeforeAll
    static void setupAll() {
        // Runs once before all tests
    }
    
    @BeforeEach
    void setup() {
        // Runs before each test
    }
    
    @Test
    @DisplayName("Test user creation")
    void testCreateUser() {
        // Test logic
    }
    
    @Test
    @Disabled("Not implemented yet")
    void testDisabled() {
        // Skipped test
    }
    
    @AfterEach
    void tearDown() {
        // Runs after each test
    }
    
    @AfterAll
    static void tearDownAll() {
        // Runs once after all tests
    }
}
```

#### Mockito for Dependency Mocking
```java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @Mock
    private EmailService emailService;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void createUser_Success() {
        // Given
        UserRequest request = new UserRequest("john", "john@example.com", "password");
        User savedUser = User.builder()
            .id(1L)
            .username("john")
            .email("john@example.com")
            .build();
        
        when(userRepository.existsByEmail("john@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        doNothing().when(emailService).sendWelcomeEmail(anyString());
        
        // When
        User result = userService.createUser(request);
        
        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getUsername()).isEqualTo("john");
        
        verify(userRepository, times(1)).existsByEmail("john@example.com");
        verify(userRepository, times(1)).save(any(User.class));
        verify(emailService, times(1)).sendWelcomeEmail("john@example.com");
        verifyNoMoreInteractions(userRepository, emailService);
    }
    
    @Test
    void createUser_EmailExists_ThrowsException() {
        // Given
        UserRequest request = new UserRequest("john", "existing@example.com", "password");
        
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);
        
        // When & Then
        assertThatThrownBy(() -> userService.createUser(request))
            .isInstanceOf(UserAlreadyExistsException.class)
            .hasMessageContaining("already exists");
        
        verify(userRepository, times(1)).existsByEmail("existing@example.com");
        verify(userRepository, never()).save(any(User.class));
        verify(emailService, never()).sendWelcomeEmail(anyString());
    }
    
    @Test
    void getUser_NotFound_ThrowsException() {
        // Given
        Long userId = 999L;
        
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        
        // When & Then
        assertThatThrownBy(() -> userService.getUser(userId))
            .isInstanceOf(UserNotFoundException.class)
            .hasMessageContaining("not found");
    }
    
    @Test
    @Timeout(5)  // Test fails if takes longer than 5 seconds
    void processBatch_WithinTimeout() {
        // Test time-sensitive operations
    }
    
    @Test
    void verifyInteractionOrder() {
        // Given
        User user = new User();
        
        // When
        userService.processUser(user);
        
        // Then
        InOrder inOrder = inOrder(userRepository, emailService);
        inOrder.verify(userRepository).save(user);
        inOrder.verify(emailService).sendConfirmation(user.getEmail());
    }
    
    @Test
    void testWithArgumentCaptor() {
        // Given
        UserRequest request = new UserRequest("john", "john@example.com", "password");
        
        when(userRepository.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(1L);
            return user;
        });
        
        // When
        userService.createUser(request);
        
        // Then
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        
        User capturedUser = userCaptor.getValue();
        assertThat(capturedUser.getUsername()).isEqualTo("john");
        assertThat(capturedUser.getEmail()).isEqualTo("john@example.com");
        assertThat(capturedUser.getPassword()).isNotEqualTo("password");  // Should be encoded
    }
}
```

#### Advanced Mockito Features
```java
class AdvancedMockitoTest {
    
    @Test
    void testSpy() {
        List<String> list = new ArrayList<>();
        List<String> spyList = spy(list);
        
        // Real method call
        spyList.add("one");
        spyList.add("two");
        
        // Verify real method was called
        verify(spyList).add("one");
        verify(spyList).add("two");
        assertThat(spyList).hasSize(2);
        
        // Stub specific method
        when(spyList.size()).thenReturn(100);
        assertThat(spyList.size()).isEqualTo(100);
    }
    
    @Test
    void testMockWithAnswers() {
        UserRepository mockRepo = mock(UserRepository.class);
        
        // Custom answer
        when(mockRepo.save(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            user.setId(ThreadLocalRandom.current().nextLong(1, 1000));
            return user;
        });
        
        // Void method with answer
        doAnswer(invocation -> {
            String email = invocation.getArgument(0);
            System.out.println("Email sent to: " + email);
            return null;
        }).when(emailService).sendWelcomeEmail(anyString());
        
        // Throw exception
        when(mockRepo.findById(anyLong())).thenThrow(new RuntimeException("Database error"));
    }
    
    @Test
    void testStaticMethodMocking() {
        try (MockedStatic<UtilityClass> mockedStatic = mockStatic(UtilityClass.class)) {
            mockedStatic.when(UtilityClass::staticMethod).thenReturn("mocked");
            
            assertThat(UtilityClass.staticMethod()).isEqualTo("mocked");
            
            mockedStatic.verify(UtilityClass::staticMethod);
        }
        // Static mock is automatically closed after try block
    }
    
    @Test
    void testMockConstruction() {
        try (MockedConstruction<ExpensiveService> mocked = mockConstruction(ExpensiveService.class)) {
            ExpensiveService service = new ExpensiveService();
            when(service.process()).thenReturn("mocked");
            
            assertThat(service.process()).isEqualTo("mocked");
        }
    }
}
```

#### Test Configuration and Profiles
```java
@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb",
    "spring.jpa.hibernate.ddl-auto=create-drop",
    "logging.level.org.springframework=WARN"
})
class BaseTest {
    // Base test class with common configuration
}

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class RepositoryTest {
    // Tests only JPA components
}

@WebMvcTest(UserController.class)
@AutoConfigureMockMvc
class ControllerTest {
    // Tests only web layer
}

@JsonTest
class JsonSerializationTest {
    // Tests JSON serialization/deserialization
}

@RestClientTest
class RestClientTest {
    // Tests REST client components
}
```

#### Interview Questions
**Beginner**: What are the differences between `@Mock` and `@InjectMocks`?
**Intermediate**: How do you test void methods with Mockito?
**Advanced**: What are the limitations of mocking static methods?

#### Testing Scenario
"You're testing a service method that calls multiple repositories and an external service. How would you write comprehensive tests?"

**Answer**: "I would write tests for:
1. **Happy path**: All dependencies succeed
2. **Error cases**: Each dependency fails individually
3. **Edge cases**: Boundary conditions, null inputs
4. **Concurrent access**: Thread safety if applicable
5. **Performance**: Timeouts for external calls
6. **Idempotency**: Multiple calls produce same result
7. **Transaction behavior**: Rollback on failures
8. **Security**: Authorization checks

I'd use Mockito for mocking, AssertJ for fluent assertions, and parameterized tests for different input combinations."

### 🟡 11.2 Integration Testing

#### Spring Boot Test Slices
```java
// Full integration test
@SpringBootTest
@AutoConfigureMockMvc
class UserIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    @Autowired
    private UserRepository userRepository;
    
    @BeforeEach
    void setup() {
        userRepository.deleteAll();
    }
    
    @Test
    void createUser_Integration_Success() throws Exception {
        // Given
        UserRequest request = new UserRequest("john", "john@example.com", "password123");
        
        // When
        MvcResult result = mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.id").exists())
            .andExpect(jsonPath("$.username").value("john"))
            .andExpect(jsonPath("$.email").value("john@example.com"))
            .andExpect(header().exists("Location"))
            .andReturn();
        
        // Then
        String location = result.getResponse().getHeader("Location");
        assertThat(location).contains("/api/users/");
        
        // Verify database state
        List<User> users = userRepository.findAll();
        assertThat(users).hasSize(1);
        assertThat(users.get(0).getUsername()).isEqualTo("john");
    }
}

// Repository integration test
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {
    
    @Autowired
    private TestEntityManager entityManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void findByEmail_ExistingEmail_ReturnsUser() {
        // Given
        User user = User.builder()
            .username("test")
            .email("test@example.com")
            .password("encoded")
            .build();
        entityManager.persist(user);
        entityManager.flush();
        
        // When
        Optional<User> found = userRepository.findByEmail("test@example.com");
        
        // Then
        assertThat(found).isPresent();
        assertThat(found.get().getUsername()).isEqualTo("test");
    }
}

// Service integration test
@SpringBootTest
class UserServiceIntegrationTest {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Test
    @Transactional
    void createUser_ValidInput_CreatesUser() {
        // Given
        UserRequest request = new UserRequest("integration", "integration@test.com", "password");
        
        // When
        User created = userService.createUser(request);
        
        // Then
        assertThat(created.getId()).isNotNull();
        assertThat(created.getUsername()).isEqualTo("integration");
        
        // Verify password is encoded
        User saved = userRepository.findById(created.getId()).orElseThrow();
        assertThat(passwordEncoder.matches("password", saved.getPassword())).isTrue();
    }
}
```

#### TestContainers for Database Testing
```java
@Testcontainers
@SpringBootTest
@AutoConfigureMockMvc
class TestContainersIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");
    
    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private UserRepository userRepository;
    
    @Test
    void testWithRealDatabase() throws Exception {
        // Test with real PostgreSQL database
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"test\",\"email\":\"test@test.com\",\"password\":\"pass\"}"))
            .andExpect(status().isCreated());
        
        assertThat(userRepository.count()).isEqualTo(1);
    }
}

// Container reuse for faster tests
@Testcontainers
@SpringBootTest
@Testcontainers
class ReusableContainerTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withReuse(true);  // Container persists between test runs
}
```

#### WebClient and RestTemplate Testing
```java
@WebMvcTest
@AutoConfigureWebClient
class WebClientTest {
    
    @Autowired
    private MockWebServiceServer server;
    
    @Autowired
    private WebClient webClient;
    
    @Test
    void testExternalApiCall() {
        // Given
        server.expect(requestTo("https://api.example.com/users/1"))
            .andExpect(method(HttpMethod.GET))
            .andRespond(withSuccess("""
                {
                    "id": 1,
                    "name": "John Doe"
                }
                """, MediaType.APPLICATION_JSON));
        
        // When
        Mono<UserResponse> result = webClient.get()
            .uri("https://api.example.com/users/1")
            .retrieve()
            .bodyToMono(UserResponse.class);
        
        // Then
        StepVerifier.create(result)
            .expectNextMatches(user -> user.getId() == 1 && user.getName().equals("John Doe"))
            .verifyComplete();
        
        server.verify();
    }
}

// RestTemplate testing with MockRestServiceServer
@SpringBootTest
class RestTemplateTest {
    
    @Autowired
    private RestTemplate restTemplate;
    
    @Autowired
    private MockRestServiceServer server;
    
    @BeforeEach
    void setup() {
        server = MockRestServiceServer.createServer(restTemplate);
    }
    
    @Test
    void testRestTemplateCall() {
        // Given
        server.expect(requestTo("https://api.example.com/data"))
            .andExpect(method(HttpMethod.POST))
            .andExpect(content().json("{\"key\":\"value\"}"))
            .andRespond(withSuccess("{\"status\":\"ok\"}", MediaType.APPLICATION_JSON));
        
        // When
        ResponseEntity<Map> response = restTemplate.postForEntity(
            "https://api.example.com/data",
            Map.of("key", "value"),
            Map.class
        );
        
        // Then
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).containsEntry("status", "ok");
        server.verify();
    }
}
```

#### Security Testing
```java
@SpringBootTest
@AutoConfigureMockMvc
class SecurityTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void authenticatedUser_CanAccessUserEndpoint() throws Exception {
        mockMvc.perform(get("/api/user/profile"))
            .andExpect(status().isOk());
    }
    
    @Test
    @WithMockUser(username = "user", roles = {"USER"})
    void user_CannotAccessAdminEndpoint() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard"))
            .andExpect(status().isForbidden());
    }
    
    @Test
    @WithMockUser(username = "admin", roles = {"ADMIN"})
    void admin_CanAccessAdminEndpoint() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard"))
            .andExpect(status().isOk());
    }
    
    @Test
    void anonymousUser_CannotAccessProtectedEndpoint() throws Exception {
        mockMvc.perform(get("/api/user/profile"))
            .andExpect(status().isUnauthorized());
    }
    
    @Test
    @WithAnonymousUser
    void anonymousUser_CanAccessPublicEndpoint() throws Exception {
        mockMvc.perform(get("/api/public/info"))
            .andExpect(status().isOk());
    }
    
    @Test
    @WithUserDetails(value = "testuser", userDetailsServiceBeanName = "customUserDetailsService")
    void withCustomUserDetails() throws Exception {
        mockMvc.perform(get("/api/user/profile"))
            .andExpect(status().isOk());
    }
}

// Custom SecurityContext for testing
class CustomSecurityTest {
    
    @Test
    void testWithCustomSecurityContext() throws Exception {
        UserDetails user = User.withUsername("custom")
            .password("password")
            .authorities("ROLE_USER")
            .build();
        
        Authentication auth = new UsernamePasswordAuthenticationToken(
            user, user.getPassword(), user.getAuthorities());
        
        mockMvc.perform(get("/api/user/profile")
                .with(securityContext(SecurityContextHolder.getContext())))
            .andExpect(status().isOk());
    }
}
```

#### Interview Questions
**Intermediate**: What are the differences between `@SpringBootTest` and `@WebMvcTest`?
**Advanced**: How do TestContainers help with integration testing?
**Expert**: What are the trade-offs between mocking and using real dependencies in tests?

#### Integration Testing Scenario
"You need to test a payment processing flow that involves database updates, external API calls, and message queue publishing. How would you design integration tests?"

**Answer**: "I would design a comprehensive integration test strategy:
1. **Database layer**: Use TestContainers with real database for repository tests
2. **Service layer**: Use embedded database and mock external dependencies
3. **External APIs**: Use WireMock for HTTP API mocking
4. **Message queues**: Use embedded ActiveMQ or Mockito for queue interactions
5. **End-to-end**: Use `@SpringBootTest` with limited external mocks
6. **Test data**: Use test data builders and `@Sql` scripts
7. **Transaction management**: Test rollback scenarios
8. **Performance**: Include response time assertions
9. **Error handling**: Test circuit breakers and retry logic
10. **Security**: Test authentication and authorization flows"

### 🟡 11.3 Testing Best Practices and Patterns

#### Test Data Builders
```java
// Builder pattern for test data
public class UserTestDataBuilder {
    
    private Long id = 1L;
    private String username = "testuser";
    private String email = "test@example.com";
    private String password = "encodedPassword";
    private UserStatus status = UserStatus.ACTIVE;
    private Set<Role> roles = new HashSet<>();
    
    private UserTestDataBuilder() {}
    
    public static UserTestDataBuilder aUser() {
        return new UserTestDataBuilder();
    }
    
    public UserTestDataBuilder withId(Long id) {
        this.id = id;
        return this;
    }
    
    public UserTestDataBuilder withUsername(String username) {
        this.username = username;
        return this;
    }
    
    public UserTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }
    
    public UserTestDataBuilder withRole(Role role) {
        this.roles.add(role);
        return this;
    }
    
    public User build() {
        User user = new User();
        user.setId(id);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);
        user.setStatus(status);
        user.setRoles(roles);
        return user;
    }
}

// Usage in tests
@Test
void testWithBuilder() {
    User user = UserTestDataBuilder.aUser()
        .withId(100L)
        .withUsername("john")
        .withEmail("john@example.com")
        .withRole(Role.ADMIN)
        .build();
    
    // Test logic using the user
}
```

#### Parameterized Tests
```java
@ParameterizedTest
@ValueSource(strings = {"user@example.com", "admin@test.com", "test@gmail.com"})
void isValidEmail_ValidEmails_ReturnsTrue(String email) {
    assertThat(emailValidator.isValid(email)).isTrue();
}

@ParameterizedTest
@NullAndEmptySource
@ValueSource(strings = {"invalid", "test@", "@domain.com", "test@.com"})
void isValidEmail_InvalidEmails_ReturnsFalse(String email) {
    assertThat(emailValidator.isValid(email)).isFalse();
}

@ParameterizedTest
@CsvSource({
    "1, true",
    "0, false",
    "-1, false",
    "100, true"
})
void isPositive_Number_ReturnsExpected(int number, boolean expected) {
    assertThat(number > 0).isEqualTo(expected);
}

@ParameterizedTest
@MethodSource("provideTestData")
void calculate_ValidInput_ReturnsExpected(int a, int b, int expected) {
    assertThat(calculator.add(a, b)).isEqualTo(expected);
}

private static Stream<Arguments> provideTestData() {
    return Stream.of(
        Arguments.of(1, 1, 2),
        Arguments.of(2, 3, 5),
        Arguments.of(0, 0, 0),
        Arguments.of(-1, 1, 0)
    );
}

@ParameterizedTest
@ArgumentsSource(CustomArgumentsProvider.class)
void testWithCustomProvider(String input, boolean expected) {
    // Test logic
}

static class CustomArgumentsProvider implements ArgumentsProvider {
    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext context) {
        return Stream.of(
            Arguments.of("valid", true),
            Arguments.of("invalid", false)
        );
    }
}
```

#### Test Configuration Management
```java
// Test configuration properties
@TestPropertySource(properties = {
    "app.feature.enabled=true",
    "app.cache.ttl=300",
    "app.retry.max-attempts=3"
})
class ConfigurationTest {
    
    @Value("${app.feature.enabled}")
    private boolean featureEnabled;
    
    @Test
    void testWithProperties() {
        assertThat(featureEnabled).isTrue();
    }
}

// Profile-specific test configuration
@ActiveProfiles("test")
@SpringBootTest(properties = "spring.config.location=classpath:application-test.yml")
class ProfileTest {
    
    @Value("${spring.datasource.url}")
    private String datasourceUrl;
    
    @Test
    void testWithProfile() {
        assertThat(datasourceUrl).contains("testdb");
    }
}

// Dynamic property configuration
@SpringBootTest
@DynamicPropertySource
static void properties(DynamicPropertyRegistry registry) {
    registry.add("app.external.url", () -> "http://localhost:8080");
    registry.add("app.timeout", () -> "5000");
}
```

#### Test Execution Order and Grouping
```java
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class OrderedTest {
    
    @Test
    @Order(1)
    void firstTest() {
        // Runs first
    }
    
    @Test
    @Order(2)
    void secondTest() {
        // Runs second
    }
    
    @Test
    @Order(3)
    void thirdTest() {
        // Runs third
    }
}

@TestMethodOrder(MethodOrderer.Random.class)
class RandomOrderTest {
    // Tests run in random order
}

@Nested
@DisplayName("User Creation Tests")
class UserCreationTest {
    
    @Test
    void createUser_ValidInput_Success() { }
    
    @Test
    void createUser_DuplicateEmail_Fails() { }
}

@Nested
@DisplayName("User Update Tests")
class UserUpdateTest {
    
    @Test
    void updateUser_ValidInput_Success() { }
    
    @Test
    void updateUser_NotFound_Fails() { }
}

// Tagging tests for selective execution
@Tag("integration")
@Tag("slow")
class IntegrationTest {
    
    @Test
    void longRunningTest() { }
}

@Tag("unit")
@Tag("fast")
class UnitTest {
    
    @Test
    void fastTest() { }
}
```

#### Test Coverage and Quality
```java
// Mutation testing with PITest
// pom.xml configuration
/*
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>1.9.0</version>
    <configuration>
        <targetClasses>
            <param>com.example.service.*</param>
        </targetClasses>
        <targetTests>
            <param>com.example.service.*Test</param>
        </targetTests>
    </configuration>
</plugin>
*/

// Jacoco coverage configuration
/*
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.10</version>
    <executions>
        <execution>
            <goals>
                <goal>prepare-agent</goal>
            </goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals>
                <goal>report</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <excludes>
            <exclude>**/model/**</exclude>
            <exclude>**/dto/**</exclude>
            <exclude>**/config/**</exclude>
        </excludes>
    </configuration>
</plugin>
*/

// Test quality metrics to track:
// 1. Line coverage (>80%)
// 2. Branch coverage (>70%)
// 3. Mutation score (>80%)
// 4. Test execution time
// 5. Flaky test rate
// 6. Test maintainability
```

#### Interview Questions
**Intermediate**: What are parameterized tests and when would you use them?
**Advanced**: How do you handle test data management in integration tests?
**Expert**: What metrics do you use to measure test quality?

#### Testing Strategy Scenario
"You're joining a team with poor test coverage and flaky tests. How would you improve the testing strategy?"

**Answer**: "I would implement a systematic improvement plan:
1. **Assessment**: Analyze current test coverage, flaky tests, and pain points
2. **Prioritization**: Focus on critical paths and high-risk areas first
3. **Standards**: Establish testing standards and best practices
4. **Infrastructure**: Set up reliable test infrastructure (TestContainers, WireMock)
5. **CI/CD**: Integrate testing into CI/CD pipeline with quality gates
6. **Monitoring**: Track test metrics and flaky test detection
7. **Education**: Train team on testing best practices
8. **Refactoring**: Gradually refactor problematic tests
9. **Automation**: Automate test data management and cleanup
10. **Culture**: Foster a quality-first culture with code reviews and pair programming"

---

*[The guide continues with logging and monitoring, advanced Spring concepts, microservices, production deployment, performance optimization, Spring Boot internals, and comprehensive interview preparation...]*


## 18. Interview Preparation

### 🎯 18.1 Complete Spring Boot Interview Question Bank

#### Core Spring Framework Questions (Beginner)
1. **What is Spring Framework and why is it popular?**
   *Spring is a comprehensive Java platform that provides infrastructure support for developing robust applications through dependency injection, aspect-oriented programming, and modular design.*

2. **Explain Inversion of Control (IoC) and Dependency Injection (DI)**
   *IoC is a design principle where object creation control is inverted to a container. DI is its implementation where dependencies are injected rather than created by objects.*

3. **What are the different types of dependency injection?**
   *Constructor injection (preferred), setter injection, and field injection. Constructor injection ensures immutability and null safety.*

4. **Explain Spring Bean lifecycle**
   *Instantiation → Population → Initialization (@PostConstruct) → Ready → Destruction (@PreDestroy)*

5. **What are Spring Bean scopes?**
   *Singleton (default), Prototype, Request, Session, Application, WebSocket*

#### Spring Boot Fundamentals (Intermediate)
6. **What is Spring Boot and how is it different from Spring?**
   *Spring Boot is an opinionated framework built on Spring that provides auto-configuration, embedded servers, and production-ready features out of the box.*

7. **Explain Spring Boot auto-configuration**
   *Auto-configuration automatically configures Spring beans based on classpath detection using @Conditional annotations.*

8. **What are Spring Boot starters?**
   *Starters are dependency descriptors that group related dependencies with compatible versions for common use cases.*

9. **How does Spring Boot handle configuration?**
   *Through application.properties/yml with hierarchical property sources and @ConfigurationProperties for type-safe binding.*

10. **Explain Spring Boot Actuator**
    *Actuator provides production-ready features like health checks, metrics, auditing, and HTTP tracing through REST endpoints.*

#### Database and JPA (Advanced)
11. **Compare JPA vs Hibernate**
    *JPA is a specification, Hibernate is its most popular implementation. Hibernate provides additional features beyond JPA.*

12. **Explain JPA entity relationships**
    *@OneToOne, @OneToMany, @ManyToOne, @ManyToMany with fetch types (LAZY/EAGER) and cascade options.*

13. **What is the N+1 problem and how to solve it?**
    *When fetching entities with relationships, multiple queries are executed. Solve with JOIN FETCH, @EntityGraph, or batch fetching.*

14. **Explain JPA transaction management**
    *@Transactional annotation with propagation levels, isolation levels, and rollback rules.*

15. **Compare optimistic vs pessimistic locking**
    *Optimistic uses versioning and retries, pessimistic uses database locks. Optimistic is better for read-heavy, pessimistic for write-heavy.*

#### Spring Security (Expert)
16. **Explain Spring Security filter chain**
    *Security filters process requests in order: SecurityContextPersistenceFilter → LogoutFilter → AuthenticationProcessingFilter → etc.*

17. **Compare session-based vs JWT authentication**
    *Session stores state server-side, JWT is stateless with tokens. JWT is better for scalability, sessions for immediate revocation.*

18. **Explain OAuth2 flow in Spring Security**
    *Authorization code flow: User → Authorization Server → Client → Resource Server with access/refresh tokens.*

19. **How to implement method-level security?**
    *Using @PreAuthorize, @PostAuthorize, @Secured annotations with SpEL expressions or custom permission evaluators.*

20. **Explain CSRF protection and CORS configuration**
    *CSRF prevents cross-site request forgery with tokens. CORS controls cross-origin resource sharing with allowed origins/methods.*

### 🎯 18.2 Advanced Interview Questions

#### Architecture and Design Patterns
21. **How would you design a microservices architecture with Spring Boot?**
    *Discuss service discovery (Eureka), API gateway (Spring Cloud Gateway), configuration server, circuit breakers (Resilience4j), and distributed tracing.*

22. **Explain Clean Architecture/Hexagonal Architecture in Spring Boot**
    *Domain layer (entities) → Application layer (use cases) → Infrastructure layer (adapters) → Presentation layer (controllers)*

23. **How do you handle distributed transactions in microservices?**
    *Saga pattern (choreography/orchestration), eventual consistency, compensating transactions, and idempotent operations.*

24. **What design patterns are commonly used with Spring?**
    *Singleton (beans), Factory (@Bean methods), Proxy (AOP), Template (JdbcTemplate), Observer (Application events), Strategy (different implementations)*

#### Performance Optimization
25. **How would you optimize Spring Boot application startup time?**
    *Lazy initialization, exclude unused auto-configurations, use Spring Boot 3+ with AOT compilation, profile with Spring Boot DevTools.*

26. **Explain connection pooling in Spring Boot**
    *HikariCP (default) manages database connections with configuration for max pool size, connection timeout, and idle timeout.*

27. **How do you implement caching in Spring Boot?**
    *@Cacheable, @CacheEvict, @CachePut annotations with Redis, Hazelcast, or Caffeine as cache providers.*

28. **What are common performance bottlenecks in Spring applications?**
    *N+1 queries, lack of pagination, improper transaction boundaries, memory leaks, synchronous blocking calls, and improper connection pooling.*

#### Production Readiness
29. **How do you handle secrets management in production?**
    *Environment variables, HashiCorp Vault, AWS Secrets Manager, Kubernetes Secrets, or encrypted properties with Jasypt.*

30. **Explain Spring Boot deployment strategies**
    *Docker containers with multi-stage builds, Kubernetes deployments with readiness/liveness probes, and blue-green or canary deployments.*

31. **How do you monitor Spring Boot applications in production?**
    *Spring Boot Actuator endpoints, Micrometer metrics with Prometheus/Grafana, distributed tracing with Sleuth/Zipkin, and log aggregation with ELK stack.*

32. **What are common Spring Boot production issues and how to troubleshoot?**
    *Memory leaks (heap dumps), deadlocks (thread dumps), slow queries (query logging), and circuit breaker trips (monitoring dashboards).*

### 🎯 18.3 Scenario-Based Questions

#### Real-World Scenarios
33. **You're building an e-commerce platform. How would you design the architecture?**
    *Microservices for catalog, cart, order, payment, inventory; event-driven communication; CQRS for read/write separation; Redis for caching.*

34. **How would you implement a rate limiter for an API?**
    *Bucket4J with Redis for distributed rate limiting, @ControllerAdvice for handling rate limit exceeded, and configuration per endpoint/user.*

35. **You need to process 1 million records from a CSV file. How would you design this?**
    *Spring Batch with chunk-based processing, parallel steps, restartability, and monitoring with job repositories.*

36. **How would you implement a search feature with filters and pagination?**
    *Elasticsearch integration with Spring Data Elasticsearch, faceted search, autocomplete suggestions, and relevance scoring.*

37. **You're building a real-time chat application. What technologies would you use?**
    *WebSocket with STOMP protocol, Redis for pub/sub messaging, JWT for authentication, and Docker for scaling.*

#### Debugging Scenarios
38. **Your Spring Boot application starts slowly. How would you diagnose this?**
    *Use Spring Boot Startup endpoint, profile with JVM tools, check @PostConstruct methods, analyze auto-configuration report, and verify database connections.*

39. **You're getting OutOfMemoryError in production. How would you investigate?**
    *Take heap dumps with jmap, analyze with Eclipse MAT, check for memory leaks in caches/sessions, and monitor GC activity.*

40. **Database queries are slow. How would you optimize them?**
    *Enable query logging, analyze execution plans, add appropriate indexes, optimize N+1 queries, and consider read replicas.*

### 🎯 18.4 Project-Based Questions

#### System Design Questions
41. **Design a URL shortening service (like TinyURL)**
    *Discuss hash generation, storage (Redis for cache, DB for persistence), rate limiting, analytics, and scalability considerations.*

42. **Design a distributed cache system**
    *Consistent hashing for distribution, cache invalidation strategies, replication for fault tolerance, and monitoring cache hit ratios.*

43. **Design a payment processing system**
    *Idempotent operations, duplicate detection, eventual consistency, retry logic with exponential backoff, and audit logging.*

44. **Design a social media feed system**
    *Fan-out-on-write vs fan-out-on-read, caching strategies, real-time updates with WebSocket, and personalized ranking algorithms.*

#### Code Review Questions
45. **Review this controller code. What issues do you see?**
    ```java
    @RestController
    public class ProblematicController {
        @Autowired private UserService userService;
        @GetMapping("/users/{id}") public User getUser(@PathVariable String id) {
            return userService.findById(Long.parseLong(id));
        }
    }
    ```
    *Missing validation, no exception handling, primitive obsession, and field injection instead of constructor injection.*

46. **What's wrong with this transaction method?**
    ```java
    @Transactional
    public void processBatch(List<Data> data) {
        for (Data d : data) {
            processItem(d); // Makes transaction too long
        }
    }
    ```
    *Long-running transaction causing locking issues. Should process in chunks with separate transactions.*

47. **Identify issues in this security configuration**
    ```java
    @Configuration
    public class InsecureConfig {
        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            http.csrf().disable()
                .authorizeRequests().anyRequest().permitAll();
            return http.build();
        }
    }
    ```
    *Disables CSRF protection, allows all requests without authentication - major security vulnerability.*

### 🎯 18.5 Mock Interview Questions

#### Rapid-Fire Questions (30 seconds each)
48. **Explain @SpringBootApplication in 30 seconds**
    *Combination of @Configuration, @EnableAutoConfiguration, and @ComponentScan that marks main class and enables Spring Boot features.*

49. **What is the difference between @Controller and @RestController?**
    *@Controller returns view names, @RestController returns JSON/XML with @ResponseBody on all methods.*

50. **Explain @Autowired vs @Resource vs @Inject**
    *@Autowired is Spring-specific, @Resource is JSR-250, @Inject is JSR-330. All do DI but with different features and default behaviors.*

51. **What is the purpose of @Transactional?**
    *Declarative transaction management that ensures ACID properties for method execution with configurable propagation and isolation.*

52. **Explain @Component vs @Bean**
    *@Component is class-level for your own classes, @Bean is method-level for any class including third-party libraries.*

#### Deep Dive Questions (2 minutes each)
53. **Explain Spring Boot auto-configuration internals in detail**
    *Spring Boot uses spring.factories to load auto-configuration classes, evaluates @Conditional annotations, and registers beans in specific order.*

54. **Walk through the complete HTTP request lifecycle in Spring MVC**
    *DispatcherServlet → HandlerMapping → HandlerAdapter → Interceptors → Controller → ExceptionHandler → ViewResolver → Response*

55. **Explain how Spring handles circular dependencies**
    *Constructor injection detects early, setter/field injection uses三级缓存 with early object references and post-processing.*

56. **Describe JPA/Hibernate first and second level caching**
    *First-level cache (session scope), second-level cache (application scope with EhCache/Infinispan), and query cache for query results.*

57. **Explain Spring Security filter chain in detail**
    *SecurityContextPersistenceFilter → LogoutFilter → UsernamePasswordAuthenticationFilter → BasicAuthenticationFilter → etc.*

#### Tricky Questions
58. **What happens when you have multiple @Transactional methods calling each other?**
    *Depends on propagation level. Default (REQUIRED) uses same transaction, REQUIRES_NEW creates new transaction, NESTED uses savepoints.*

59. **How does Spring handle prototype beans injected into singleton beans?**
    *Uses proxy (ScopedProxyMode.TARGET_CLASS) or method injection (@Lookup) to get fresh instance each time.*

60. **What's the difference between @PathVariable and @RequestParam?**
    *@PathVariable extracts from URL path segments, @RequestParam extracts from query parameters.*

61. **When would you use @Primary vs @Qualifier?**
    *@Primary marks default bean when multiple exist, @Qualifier specifies exact bean by name.*

62. **Explain the difference between PUT and PATCH**
    *PUT replaces entire resource, PATCH performs partial update. PUT is idempotent, PATCH may or may not be idempotent.*

---

## 19. Final Knowledge Checklist

### ✅ Core Spring Framework
- [ ] Understand IoC and Dependency Injection
- [ ] Know bean lifecycle and scopes
- [ ] Understand AOP and proxies
- [ ] Know Spring MVC architecture
- [ ] Understand Spring events

### ✅ Spring Boot Fundamentals
- [ ] Auto-configuration mechanism
- [ ] Starter dependencies
- [ ] Externalized configuration
- [ ] Actuator and production features
- [ ] Embedded servers

### ✅ Database Integration
- [ ] JDBC with JdbcTemplate
- [ ] JPA/Hibernate entities and relationships
- [ ] Spring Data JPA repositories
- [ ] Transaction management
- [ ] Connection pooling

### ✅ REST API Development
- [ ] REST controllers and mappings
- [ ] Request/response handling
- [ ] Validation (Bean Validation)
- [ ] Exception handling
- [ ] Content negotiation

### ✅ Spring Security
- [ ] Authentication mechanisms
- [ ] Authorization (RBAC)
- [ ] JWT implementation
- [ ] OAuth2/OIDC
- [ ] CSRF and CORS

### ✅ Testing
- [ ] Unit testing with JUnit/Mockito
- [ ] Integration testing
- [ ] TestContainers for databases
- [ ] Security testing
- [ ] Performance testing

### ✅ Advanced Topics
- [ ] Caching (@Cacheable)
- [ ] Scheduling (@Scheduled)
- [ ] Async processing (@Async)
- [ ] Actuator endpoints
- [ ] Custom starters

### ✅ Microservices
- [ ] Service discovery
- [ ] API Gateway
- [ ] Configuration management
- [ ] Circuit breakers
- [ ] Distributed tracing

### ✅ Production Readiness
- [ ] Docker containerization
- [ ] Kubernetes deployment
- [ ] Monitoring and metrics
- [ ] Logging best practices
- [ ] Performance optimization

### ✅ Interview Preparedness
- [ ] Can explain any concept in 30 seconds
- [ ] Can explain any concept in 2 minutes
- [ ] Can solve scenario-based problems
- [ ] Can review code effectively
- [ ] Can design systems from scratch

---

## 20. Final Revision and Next Steps

### 📝 Revision Strategy
1. **Daily**: Review 5 concepts with examples
2. **Weekly**: Practice coding exercises
3. **Bi-weekly**: Mock interviews
4. **Monthly**: Build small projects

### 🚀 Project Recommendations
1. **Beginner**: REST API with CRUD operations
2. **Intermediate**: E-commerce microservices
3. **Advanced**: Real-time chat application
4. **Expert**: Distributed payment system

### 📚 Recommended Resources
1. **Official Documentation**: Spring.io guides
2. **Books**: "Spring Boot in Action", "Spring Microservices in Action"
3. **Courses**: Udemy, Pluralsight, Baeldung
4. **Practice**: LeetCode, HackerRank, Codewars

### 🎯 Final Tips for Success
1. **Understand the "Why"**: Don't just memorize, understand why things work
2. **Practice Coding**: Write code daily, even small examples
3. **Think Aloud**: In interviews, explain your thought process
4. **Ask Questions**: Clarify requirements before solving
5. **Stay Updated**: Follow Spring releases and new features
6. **Build Portfolio**: Create GitHub projects to showcase skills
7. **Network**: Join Spring communities and attend meetups
8. **Continuous Learning**: Technology evolves, keep learning

---

## Conclusion

This comprehensive guide has covered Spring Boot from fundamentals to expert-level concepts, with a focus on interview preparation. Remember:

1. **Spring Boot is a journey**, not a destination
2. **Practice is key** to mastering concepts
3. **Real-world experience** complements theoretical knowledge
4. **Continuous learning** is essential in software development

Use this guide as a living document - revisit sections, update with new knowledge, and expand on areas relevant to your career goals.

### 📞 Need Help or Have Questions?
- Review the examples in this guide
- Build projects to apply concepts
- Join Spring communities online
- Practice with mock interviews
- Never stop learning and experimenting

**Good luck with your Spring Boot journey and interview preparation!** 🚀

*"The expert in anything was once a beginner."*

---

*Document Version: 1.0*  
*Last Updated: August 2026*  
*Author: Spring Boot Learning Guide*  
*For educational purposes only*

