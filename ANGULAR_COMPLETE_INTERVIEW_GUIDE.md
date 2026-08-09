# Angular Complete Interview Preparation and Learning Guide

_Last Updated: August 2026_  
_For Developers Preparing for Angular Interviews from Beginner to Expert Level_

---

## Table of Contents

1. [Introduction and Learning Approach](#introduction-and-learning-approach)
2. [Web & TypeScript Foundations](#web--typescript-foundations)
3. [Angular Fundamentals](#angular-fundamentals)
4. [Components](#components)
5. [Standalone Components & Modern Angular](#standalone-components--modern-angular)
6. [Templates and Data Binding](#templates-and-data-binding)
7. [Angular Signals](#angular-signals)
8. [Change Detection](#change-detection)
9. [Dependency Injection](#dependency-injection)
10. [Services](#services)
11. [Directives](#directives)
12. [Pipes](#pipes)
13. [RxJS in Angular](#rxjs-in-angular)
14. [Forms](#forms)
15. [Routing and Navigation](#routing-and-navigation)
16. [HTTP and API Integration](#http-and-api-integration)
17. [State Management](#state-management)
18. [Angular Modules & Architecture](#angular-modules--architecture)
19. [Lazy Loading & Performance](#lazy-loading--performance)
20. [Modern Angular Features (@defer, etc.)](#modern-angular-features)
21. [Angular Security](#angular-security)
22. [Testing in Angular](#testing-in-angular)
23. [Angular Build System & Tooling](#angular-build-system--tooling)
24. [Angular Internals](#angular-internals)
25. [Debugging & Troubleshooting](#debugging--troubleshooting)
26. [Architecture & Best Practices](#architecture--best-practices)
27. [Angular + Backend Integration](#angular--backend-integration)
28. [Interview Preparation](#interview-preparation)
29. [Comparison Questions](#comparison-questions)
30. [Project-Based Interview Questions](#project-based-interview-questions)
31. [Final Knowledge Checklist](#final-knowledge-checklist)

---

## 1. Introduction and Learning Approach

### 🎯 Objective

This guide provides comprehensive Angular knowledge, structured for interview preparation and real-world project development. Unlike typical syllabus-style documents, this contains actual learning material with detailed explanations, examples, and interview-ready answers.

### 📊 Difficulty Classification

- **🟢 Must Know**: Core concepts every Angular developer should understand
- **🟡 Should Know**: Important topics for intermediate to advanced developers
- **🟠 Advanced**: Complex topics for senior developers and architects
- **🔴 Expert**: Deep dive into internals and specialized scenarios

### 📚 Learning Structure

The guide follows a progressive learning path:

1. **Foundation**: TypeScript and Angular core concepts
2. **Component Development**: Building Angular components and templates
3. **Advanced Topics**: Signals, RxJS, state management, performance
4. **Production Readiness**: Testing, deployment, security, debugging
5. **Interview Mastery**: Questions, scenarios, and best practices

### 🎓 How to Use This Guide

- **For Beginners**: Start from the beginning and work through sequentially
- **For Intermediate**: Focus on Signals, RxJS, and state management sections
- **For Advanced**: Deep dive into internals, performance, and architecture
- **For Interview Prep**: Jump to interview sections and practice questions
- **Quick Revision**: Use the key takeaways at the end of each section

---

## 2. Web & TypeScript Foundations

### 🟢 2.1 JavaScript Fundamentals for Angular

#### Why JavaScript Matters for Angular

Angular is built on TypeScript, which compiles to JavaScript. Understanding JavaScript fundamentals is crucial for:

- Understanding how Angular works under the hood
- Debugging issues effectively
- Writing efficient Angular code
- Handling asynchronous operations

#### ES6+ Features Essential for Angular

**1. let and const**

```javascript
// var has function scope, let/const have block scope
var oldWay = "function scoped";
let newWay = "block scoped";
const constant = "cannot be reassigned";

// In Angular, prefer const for values that don't change
const API_URL = "https://api.example.com";
let userCount = 0;
```

**2. Arrow Functions**

```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Important for Angular: Arrow functions don't have their own 'this'
class UserComponent {
  userName = 'John';

  // Traditional function - 'this' is lost
  setTimeout(function() {
    console.log(this.userName); // undefined
  }, 1000);

  // Arrow function - 'this' is preserved
  setTimeout(() => {
    console.log(this.userName); // 'John'
  }, 1000);
}
```

**3. Destructuring**

```javascript
// Object destructuring
const user = { name: "John", age: 30, email: "john@example.com" };
const { name, age } = user;

// Array destructuring
const colors = ["red", "green", "blue"];
const [first, second] = colors;

// In Angular components
@Component({
  template: `<div>{{ name }} - {{ age }}</div>`,
})
export class UserComponent {
  ngOnInit() {
    const { name, age } = this.userService.getUser();
    this.name = name;
    this.age = age;
  }
}
```

**4. Spread and Rest Operators**

```javascript
// Spread operator - expands array/object
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const user = { name: 'John', age: 30 };
const updatedUser = { ...user, age: 31 }; // { name: 'John', age: 31 }

// Rest operator - collects multiple elements
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

// In Angular
updateUser(updates: Partial<User>) {
  this.user = { ...this.user, ...updates };
}
```

**5. Promises and Async/Await**

```javascript
// Promise
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('data'), 1000);
  });
}

// Using Promise
fetchData().then(data => console.log(data));

// Async/Await
async function getData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// In Angular services
export class UserService {
  async getUser(id: number): Promise<User> {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
  }
}
```

**6. Modules (Import/Export)**

```javascript
// Exporting
export class User {
  constructor(public name: string) {}
}

export const API_URL = 'https://api.example.com';

// Importing
import { User, API_URL } from './user';

// Default export
export default class UserService {}

// Default import
import UserService from './user.service';
```

**7. Understanding 'this' in JavaScript**

```javascript
// 'this' in different contexts
const obj = {
  name: "Object",
  regularFunction: function () {
    console.log(this.name); // 'Object'
  },
  arrowFunction: () => {
    console.log(this.name); // undefined (lexical scope)
  },
};

// In Angular, 'this' refers to the component instance
@Component({})
export class MyComponent {
  name = "Component";

  onClick() {
    console.log(this.name); // 'Component'
  }
}
```

### 🟢 2.2 TypeScript Essentials for Angular

#### What is TypeScript?

TypeScript is a statically-typed superset of JavaScript that compiles to plain JavaScript. Angular is built with TypeScript and requires it for development.

**Why TypeScript for Angular?**

- Type safety catches errors at compile time
- Better IDE support with autocomplete
- Enhanced code documentation
- Enables decorators (essential for Angular)
- Improves code maintainability and refactoring

#### Basic Types

```typescript
// Primitive types
let userName: string = "John";
let age: number = 30;
let isActive: boolean = true;
let data: any = "can be anything"; // Avoid using 'any'
let nothing: null = null;
let notDefined: undefined = undefined;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b", "c"];

// Tuple
let tuple: [string, number] = ["John", 30];

// Enum
enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
  Pending = "PENDING",
}
let userStatus: Status = Status.Active;

// Unknown (safer than any)
let uncertain: unknown = "could be anything";
if (typeof uncertain === "string") {
  console.log(uncertain.toUpperCase()); // Type-safe
}

// Never (for functions that never return)
function throwError(message: string): never {
  throw new Error(message);
}
```

#### Interfaces and Type Aliases

```typescript
// Interface - defines object structure
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Read-only property
}

// Using interface
const user: User = {
  id: 1,
  name: "John",
  email: "john@example.com",
  createdAt: new Date(),
};

// Type alias - similar to interface but more flexible
type ID = string | number;
type UserRole = "admin" | "user" | "guest"; // Union type

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// Interface vs Type
// Interface can be extended
interface Employee extends User {
  employeeId: string;
  department: string;
}

// Type can use union types
type Status = "success" | "error" | "loading";
```

#### Classes

```typescript
// Basic class
class Person {
  // Properties
  name: string;
  private age: number; // Private property
  protected address: string; // Protected property

  // Constructor
  constructor(name: string, age: number, address: string) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  // Method
  greet(): string {
    return `Hello, I'm ${this.name}`;
  }

  // Getter
  get userAge(): number {
    return this.age;
  }

  // Setter
  set userAge(value: number) {
    if (value > 0) {
      this.age = value;
    }
  }
}

// Shorthand constructor (common in Angular)
class User {
  constructor(
    public id: number,
    public name: string,
    private password: string,
  ) {}
}
```

#### Generics

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(42);

// Generic class
class DataHolder<T> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  get(index: number): T {
    return this.data[index];
  }
}

const numberHolder = new DataHolder<number>();
numberHolder.add(1);

// Generic interface
interface Repository<T> {
  find(id: number): T;
  findAll(): T[];
  save(item: T): void;
  delete(id: number): void;
}

// In Angular services
@Injectable()
export class UserService implements Repository<User> {
  find(id: number): User {
    // Implementation
  }
  // ... other methods
}
```

#### Union and Intersection Types

```typescript
// Union types - can be one of several types
type StringOrNumber = string | number;

function printId(id: StringOrNumber) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id.toFixed(2));
  }
}

// Intersection types - combines multiple types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

type EmployeePerson = Person & Employee;

const employee: EmployeePerson = {
  name: "John",
  age: 30,
  employeeId: "E001",
  department: "IT",
};
```

#### Type Narrowing and Type Guards

```typescript
// Type narrowing with typeof
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's number
  }
}

// Type guards with instanceof
class Dog {
  bark() {
    console.log("Woof!");
  }
}

class Cat {
  meow() {
    console.log("Meow!");
  }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// Custom type guard
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}
```

#### Optional Chaining and Nullish Coalescing

```typescript
// Optional chaining (?.)
interface User {
  name: string;
  address?: {
    street?: string;
    city?: string;
  };
}

const user: User = { name: "John" };

// Without optional chaining
const city = user.address && user.address.city;

// With optional chaining
const cityNew = user.address?.city; // undefined if address doesn't exist

// Nullish coalescing (??)
const value1 = null ?? "default"; // 'default'
const value2 = undefined ?? "default"; // 'default'
const value3 = 0 ?? "default"; // 0 (not 'default')
const value4 = "" ?? "default"; // '' (not 'default')

// vs OR operator
const value5 = 0 || "default"; // 'default' (0 is falsy)
const value6 = "" || "default"; // 'default' ('' is falsy)
```

#### Decorators (Essential for Angular)

```typescript
// Decorators are functions that modify classes, properties, methods, or parameters
// Angular heavily relies on decorators

// Class decorator
function Component(config: any) {
  return function (target: any) {
    // Modify the class
    target.prototype.componentConfig = config;
  };
}

@Component({ selector: "app-user" })
class UserComponent {}

// Property decorator
function Input() {
  return function (target: any, propertyKey: string) {
    // Define property metadata
  };
}

class MyComponent {
  @Input() userName: string;
}

// Method decorator
function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    return originalMethod.apply(this, args);
  };
}

class Calculator {
  @LogMethod
  add(a: number, b: number): number {
    return a + b;
  }
}
```

#### Access Modifiers

```typescript
class BankAccount {
  public accountNumber: string; // Accessible everywhere
  private balance: number; // Only within class
  protected owner: string; // Within class and subclasses
  readonly createdAt: Date; // Cannot be modified after initialization

  constructor(accountNumber: string, owner: string, balance: number) {
    this.accountNumber = accountNumber;
    this.owner = owner;
    this.balance = balance;
    this.createdAt = new Date();
  }

  private calculateInterest(): number {
    return this.balance * 0.05;
  }

  public getBalance(): number {
    return this.balance;
  }
}

class SavingsAccount extends BankAccount {
  withdraw(amount: number) {
    // Can access protected 'owner'
    console.log(`${this.owner} withdrawing ${amount}`);

    // Cannot access private 'balance'
    // this.balance -= amount; // Error!
  }
}
```

#### Utility Types

```typescript
// Partial<T> - makes all properties optional
interface User {
  id: number;
  name: string;
  email: string;
}

function updateUser(id: number, updates: Partial<User>) {
  // Can pass { name: 'John' } or { email: 'john@example.com' }
}

// Required<T> - makes all properties required
type OptionalUser = {
  id?: number;
  name?: string;
};

type RequiredUser = Required<OptionalUser>;
// { id: number; name: string; }

// Readonly<T> - makes all properties readonly
type ReadonlyUser = Readonly<User>;
// Cannot modify properties

// Pick<T, K> - picks specific properties
type UserPreview = Pick<User, "id" | "name">;
// { id: number; name: string; }

// Omit<T, K> - removes specific properties
type UserWithoutId = Omit<User, "id">;
// { name: string; email: string; }

// Record<K, T> - creates object type with specific keys
type UserRoles = Record<string, string[]>;
// { [key: string]: string[] }

// ReturnType<T> - gets return type of function
function getUser() {
  return { id: 1, name: "John" };
}

type User = ReturnType<typeof getUser>;
// { id: number; name: string; }
```

### Key Takeaways: TypeScript Foundations

✅ **Type Safety**: TypeScript catches errors at compile time  
✅ **Interfaces**: Define contracts for objects  
✅ **Generics**: Write reusable, type-safe code  
✅ **Decorators**: Essential for Angular (components, services, etc.)  
✅ **Utility Types**: Powerful type manipulation  
✅ **Type Narrowing**: TypeScript understands your type checks

### Common TypeScript Mistakes

❌ **Overusing `any`**: Defeats the purpose of TypeScript  
❌ **Not using strict mode**: Enable strict TypeScript checks  
❌ **Ignoring nullable types**: Can lead to runtime errors  
❌ **Not understanding `this` context**: Especially with arrow functions

---

## 3. Angular Fundamentals

### 🟢 3.1 What is Angular?

#### Definition

Angular is a **TypeScript-based, open-source web application framework** developed and maintained by Google. It's a complete rewrite of AngularJS (Angular 1.x) and provides a comprehensive solution for building client-side applications.

#### Why Angular?

1. **Complete Framework**: Unlike libraries (React), Angular provides everything out of the box
2. **TypeScript**: Type safety, better tooling, enhanced maintainability
3. **Component-Based**: Modular, reusable UI components
4. **Two-Way Data Binding**: Automatic synchronization between model and view
5. **Dependency Injection**: Built-in DI system for better code organization
6. **Comprehensive Tooling**: Angular CLI for scaffolding, building, testing
7. **Enterprise-Ready**: Suitable for large-scale applications
8. **Active Community**: Google-backed with strong community support

#### Angular vs AngularJS

| Feature              | AngularJS (1.x)  | Angular (2+)          |
| -------------------- | ---------------- | --------------------- |
| Language             | JavaScript       | TypeScript            |
| Architecture         | MVC              | Component-based       |
| Mobile Support       | Poor             | Excellent             |
| Performance          | Slower           | Much faster           |
| Learning Curve       | Moderate         | Steeper               |
| Dependency Injection | Yes              | Enhanced              |
| Two-Way Binding      | $scope           | [(ngModel)]           |
| CLI                  | None             | Angular CLI           |
| Module System        | angular.module() | @NgModule, Standalone |
| Current Status       | Deprecated       | Active development    |

#### Angular Architecture Overview

```
┌─────────────────────────────────────────┐
│           Angular Application           │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────┐   ┌─────────────┐    │
│  │ Components  │   │  Templates  │    │
│  │ (TypeScript)│◄─►│   (HTML)    │    │
│  └─────────────┘   └─────────────┘    │
│         │                 │             │
│         │                 │             │
│  ┌──────▼──────┐   ┌─────▼──────┐    │
│  │  Services   │   │ Directives │    │
│  │   (Logic)   │   │   & Pipes  │    │
│  └──────┬──────┘   └────────────┘    │
│         │                              │
│  ┌──────▼──────────────────┐         │
│  │  Dependency Injection   │         │
│  └─────────────────────────┘         │
│                                       │
│  ┌─────────────────────────┐         │
│  │    Router (Navigation)  │         │
│  └─────────────────────────┘         │
│                                       │
│  ┌─────────────────────────┐         │
│  │    HTTP Client (APIs)   │         │
│  └─────────────────────────┘         │
└───────────────────────────────────────┘
```

**Key Building Blocks:**

1. **Modules**: Organize application into cohesive blocks (NgModule or Standalone)
2. **Components**: Control UI views with templates and logic
3. **Templates**: HTML with Angular syntax for dynamic content
4. **Directives**: Modify DOM behavior or appearance
5. **Services**: Reusable business logic and data access
6. **Dependency Injection**: Manage service dependencies
7. **Router**: Navigate between views
8. **Pipes**: Transform data in templates

#### Angular Versions and Evolution

```
AngularJS (1.x) → Angular 2 → Angular 4 → ... → Angular 17+ (Current)

Major Changes:
- Angular 2 (2016): Complete rewrite, TypeScript, component-based
- Angular 4 (2017): Smaller bundles, improved compiler
- Angular 6 (2018): Angular Elements, CLI improvements
- Angular 8 (2019): Ivy preview, differential loading
- Angular 9 (2020): Ivy by default, improved build times
- Angular 12 (2021): Stricter types, deprecation of View Engine
- Angular 14 (2022): Standalone components introduced
- Angular 15 (2022): Standalone APIs stabilized
- Angular 16 (2023): Signals introduced (developer preview)
- Angular 17 (2023): Signals stabilized, new control flow syntax
```

**Modern Angular Features (v16+):**

- ✨ Signals for reactive state management
- ✨ Standalone components (no NgModule required)
- ✨ New control flow syntax (@if, @for, @switch)
- ✨ Improved performance with fine-grained reactivity
- ✨ Better developer experience

### 🟢 3.2 Angular CLI

#### What is Angular CLI?

Angular Command Line Interface (CLI) is a powerful tool for initializing, developing, scaffolding, and maintaining Angular applications.

#### Essential CLI Commands

```bash
# Install Angular CLI globally
npm install -g @angular/cli

# Check version
ng version

# Create new application
ng new my-app
ng new my-app --routing --style=scss
ng new my-app --standalone --routing

# Serve application (development mode)
ng serve
ng serve --open  # Opens browser automatically
ng serve --port 4300  # Custom port

# Generate components, services, etc.
ng generate component user
ng g c user  # Shorthand
ng g c user --standalone  # Standalone component
ng g s services/user  # Generate service
ng g m feature/users --routing  # Module with routing

# Build for production
ng build
ng build --configuration production
ng build --prod  # Older versions

# Run tests
ng test  # Unit tests
ng e2e   # End-to-end tests

# Linting
ng lint

# Add packages
ng add @angular/material
ng add @ngrx/store

# Update Angular
ng update
ng update @angular/core @angular/cli
```

### 🟢 3.3 Angular Project Structure

```
my-angular-app/
│
├── node_modules/          # Dependencies
├── src/                   # Source code
│   ├── app/              # Application code
│   │   ├── components/   # Feature components
│   │   ├── services/     # Business logic services
│   │   ├── models/       # TypeScript interfaces/classes
│   │   ├── guards/       # Route guards
│   │   ├── interceptors/ # HTTP interceptors
│   │   ├── pipes/        # Custom pipes
│   │   ├── directives/   # Custom directives
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.config.ts  # App configuration (modern)
│   │   └── app.routes.ts  # Routes (modern)
│   │
│   ├── assets/           # Static assets (images, fonts)
│   ├── environments/     # Environment configurations
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── index.html        # Main HTML file
│   ├── main.ts           # Application entry point
│   ├── styles.scss       # Global styles
│   └── polyfills.ts      # Browser polyfills
│
├── angular.json          # Angular CLI configuration
├── package.json          # NPM dependencies
├── tsconfig.json         # TypeScript configuration
├── tsconfig.app.json     # App TypeScript config
├── tsconfig.spec.json    # Test TypeScript config
└── README.md
```

#### Key Configuration Files

**1. angular.json**

```json
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {
          "options": {
            "outputPath": "dist/my-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.scss"],
            "scripts": []
          }
        }
      }
    }
  }
}
```

**2. tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "lib": ["ES2022", "dom"],
    "strict": true,
    "strictNullChecks": true,
    "noImplicitAny": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

**3. package.json**

```json
{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint"
  },
  "dependencies": {
    "@angular/core": "^17.0.0",
    "@angular/common": "^17.0.0",
    "@angular/router": "^17.0.0",
    "rxjs": "^7.8.0",
    "tslib": "^2.6.0",
    "zone.js": "^0.14.0"
  }
}
```

### 🟢 3.4 Angular Application Bootstrap

#### Traditional NgModule Bootstrap

```typescript
// main.ts (NgModule-based)
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// app.module.ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent], // Components, directives, pipes
  imports: [BrowserModule], // Other modules
  providers: [], // Services
  bootstrap: [AppComponent], // Root component
})
export class AppModule {}
```

#### Modern Standalone Bootstrap (Angular 14+)

```typescript
// main.ts (Standalone)
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);

// app.config.ts
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    // Other providers
  ],
};

// app.component.ts
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet], // Import dependencies directly
  template: `
    <h1>Welcome to {{ title }}</h1>
    <router-outlet />
  `,
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "my-app";
}
```

#### What Happens During Bootstrap?

```
1. main.ts executes
       ↓
2. Angular platform is created
       ↓
3. Root module/component is compiled
       ↓
4. Dependency injection tree is built
       ↓
5. Root component is created
       ↓
6. Change detection is initialized
       ↓
7. Component template is rendered
       ↓
8. Application is ready
```

### 🟢 3.5 Angular Compiler

#### JIT vs AOT Compilation

| Feature             | JIT (Just-in-Time)         | AOT (Ahead-of-Time) |
| ------------------- | -------------------------- | ------------------- |
| **When**            | At runtime in browser      | At build time       |
| **Bundle Size**     | Larger (includes compiler) | Smaller             |
| **Build Time**      | Faster                     | Slower              |
| **Performance**     | Slower initial load        | Faster initial load |
| **Error Detection** | Runtime                    | Build time          |
| **Production**      | Not recommended            | Recommended         |
| **Development**     | Faster rebuilds            | Slower rebuilds     |

```bash
# Development (JIT)
ng serve

# Production (AOT by default)
ng build --configuration production

# Force AOT in development
ng serve --aot
```

#### How Angular Compilation Works

```typescript
// Before compilation (what you write)
@Component({
  selector: "app-user",
  template: `
    <div>{{ user.name }}</div>
    <button (click)="save()">Save</button>
  `,
})
export class UserComponent {
  user = { name: "John" };
  save() {
    /* ... */
  }
}

// After compilation (simplified)
class UserComponent {
  user = { name: "John" };
  save() {
    /* ... */
  }

  // Generated by compiler
  static ɵcmp = defineComponent({
    selectors: [["app-user"]],
    template: function (rf, ctx) {
      if (rf & 1) {
        element(0, "div");
        text(1);
        element(2, "button");
        listener("click", function () {
          return ctx.save();
        });
        text(3, "Save");
      }
      if (rf & 2) {
        textInterpolate(ctx.user.name);
      }
    },
  });
}
```

### Key Takeaways: Angular Fundamentals

✅ **Angular is a complete framework** with everything you need  
✅ **TypeScript is mandatory** for Angular development  
✅ **Component-based architecture** for modular development  
✅ **Angular CLI** simplifies development workflow  
✅ **AOT compilation** for production builds  
✅ **Modern Angular** emphasizes standalone components

### Interview Questions: Angular Fundamentals

**Beginner:**

Q: What is Angular and how is it different from AngularJS?  
A: Angular is a complete TypeScript-based framework (v2+), while AngularJS (v1.x) was JavaScript-based. Angular has better performance, component-based architecture, mobile support, and is actively maintained.

Q: What is Angular CLI and why is it useful?  
A: Angular CLI is a command-line tool for creating, developing, building, and testing Angular applications. It provides commands like `ng new`, `ng generate`, `ng serve`, and `ng build` to streamline development.

**Intermediate:**

Q: Explain the difference between JIT and AOT compilation.  
A: JIT compiles the application in the browser at runtime, while AOT compiles at build time. AOT results in smaller bundles, faster rendering, and early error detection, making it ideal for production.

Q: What are the main building blocks of an Angular application?  
A: Modules (or standalone), Components, Templates, Directives, Services, Dependency Injection, Router, and Pipes.

---

## 4. Components

### 🟢 4.1 Component Basics

#### What is a Component?

A component controls a patch of the screen called a _view_. It consists of:

- **TypeScript class**: Contains the logic
- **HTML template**: Defines the view
- **CSS styles**: Defines the appearance
- **Metadata**: Defined using `@Component` decorator

#### Component Anatomy

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user", // How to use: <app-user></app-user>
  templateUrl: "./user.component.html", // Or inline: template: `<div>...</div>`
  styleUrls: ["./user.component.scss"], // Or inline: styles: [`div { ... }`]
  standalone: true, // Modern: standalone component
  imports: [CommonModule], // Dependencies (standalone only)
})
export class UserComponent implements OnInit {
  // Properties
  title = "User Management";
  user = {
    name: "John Doe",
    email: "john@example.com",
  };

  // Constructor
  constructor(private userService: UserService) {}

  // Lifecycle hook
  ngOnInit(): void {
    this.loadUser();
  }

  // Methods
  loadUser(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  saveUser(): void {
    console.log("Saving user:", this.user);
  }
}
```

#### Component Metadata

```typescript
@Component({
  // Selector - CSS selector that identifies component in template
  selector: 'app-user',           // Element: <app-user>
  // selector: '[app-user]',      // Attribute: <div app-user>
  // selector: '.app-user',       // Class: <div class="app-user">

  // Template
  template: `<div>{{ user.name }}</div>`,  // Inline template
  // OR
  templateUrl: './user.component.html',    // External template

  // Styles
  styles: [`div { color: blue; }`],        // Inline styles
  // OR
  styleUrls: ['./user.component.scss'],    // External styles

  // Standalone (modern Angular)
  standalone: true,
  imports: [CommonModule, FormsModule],

  // Providers (component-level services)
  providers: [UserService],

  // Change detection strategy
  changeDetection: ChangeDetectionStrategy.OnPush,

  // View encapsulation
  encapsulation: ViewEncapsulation.Emulated,  // Default

  // Preserve whitespace
  preserveWhitespaces: false,

  // Animations
  animations: [fadeInAnimation]
})
```

### 🟢 4.2 Component Communication

#### Parent to Child: @Input()

```typescript
// Child component
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-child",
  standalone: true,
  template: `
    <div>
      <h3>{{ title }}</h3>
      <p>{{ user.name }} - {{ user.email }}</p>
    </div>
  `,
})
export class ChildComponent {
  @Input() title: string = "";
  @Input() user!: User; // '!' = definitely assigned
  @Input({ required: true }) userId!: number; // Required input
  @Input({ alias: "userName" }) name: string = ""; // Input alias
}

// Parent component
@Component({
  selector: "app-parent",
  standalone: true,
  imports: [ChildComponent],
  template: `
    <app-child
      [title]="pageTitle"
      [user]="currentUser"
      [userId]="123"
      [userName]="username"
    >
    </app-child>
  `,
})
export class ParentComponent {
  pageTitle = "User Details";
  currentUser = { name: "John", email: "john@example.com" };
  username = "john_doe";
}
```

#### Child to Parent: @Output() and EventEmitter

```typescript
// Child component
import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-child",
  standalone: true,
  template: `
    <button (click)="onSave()">Save</button>
    <button (click)="onDelete()">Delete</button>
  `,
})
export class ChildComponent {
  @Output() save = new EventEmitter<User>();
  @Output() delete = new EventEmitter<number>();
  @Output("remove") deleteAlias = new EventEmitter(); // Output alias

  user = { id: 1, name: "John" };

  onSave() {
    this.save.emit(this.user); // Emit user object
  }

  onDelete() {
    this.delete.emit(this.user.id); // Emit user id
  }
}

// Parent component
@Component({
  selector: "app-parent",
  standalone: true,
  imports: [ChildComponent],
  template: `
    <app-child (save)="handleSave($event)" (delete)="handleDelete($event)">
    </app-child>
  `,
})
export class ParentComponent {
  handleSave(user: User) {
    console.log("User saved:", user);
  }

  handleDelete(id: number) {
    console.log("User deleted:", id);
  }
}
```

#### ViewChild and ContentChild

```typescript
// ViewChild - access child component/element in template
import { Component, ViewChild, AfterViewInit, ElementRef } from "@angular/core";

@Component({
  selector: "app-parent",
  standalone: true,
  imports: [ChildComponent],
  template: `
    <input #nameInput type="text" />
    <app-child #childComp></app-child>
    <button (click)="accessChild()">Access Child</button>
  `,
})
export class ParentComponent implements AfterViewInit {
  @ViewChild("nameInput") nameInput!: ElementRef<HTMLInputElement>;
  @ViewChild("childComp") childComponent!: ChildComponent;
  @ViewChild(ChildComponent, { static: true }) staticChild!: ChildComponent;

  ngAfterViewInit() {
    // Can access child component and elements here
    console.log(this.nameInput.nativeElement.value);
    this.childComponent.someMethod();
  }

  accessChild() {
    this.nameInput.nativeElement.focus();
    this.childComponent.title = "Updated Title";
  }
}

// ContentChild - access projected content
@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent implements AfterContentInit {
  @ContentChild("cardTitle") title!: ElementRef;

  ngAfterContentInit() {
    console.log(this.title.nativeElement.textContent);
  }
}

// Usage
@Component({
  template: `
    <app-card>
      <h2 #cardTitle>Card Title</h2>
      <p>Card content</p>
    </app-card>
  `,
})
export class ParentComponent {}
```

#### Template Reference Variables

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  imports: [ChildComponent],
  template: `
    <!-- Reference to element -->
    <input #nameInput type="text" />
    <button (click)="nameInput.focus()">Focus Input</button>

    <!-- Reference to component -->
    <app-child #child></app-child>
    <button (click)="child.reset()">Reset Child</button>

    <!-- Reference to directive -->
    <form #myForm="ngForm">
      <input name="username" ngModel />
    </form>
    <button (click)="myForm.reset()">Reset Form</button>
  `,
})
export class ExampleComponent {}
```

### 🟢 4.3 Component Lifecycle Hooks

#### Lifecycle Sequence

```
1. constructor()                    // Component creation
2. ngOnChanges()                    // Input changes (before ngOnInit)
3. ngOnInit()                       // Component initialization
4. ngDoCheck()                      // Custom change detection
5. ngAfterContentInit()             // Content projection initialized
6. ngAfterContentChecked()          // Content checked
7. ngAfterViewInit()                // View initialized
8. ngAfterViewChecked()             // View checked
9. ngOnChanges()                    // Subsequent input changes
10. ngOnDestroy()                   // Component destruction
```

#### ngOnChanges

```typescript
import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: "app-user",
  standalone: true,
  template: `<div>{{ user.name }}</div>`,
})
export class UserComponent implements OnChanges {
  @Input() user!: User;
  @Input() count: number = 0;

  ngOnChanges(changes: SimpleChanges) {
    // Called before ngOnInit and whenever @Input properties change

    if (changes["user"]) {
      const change = changes["user"];
      console.log("Previous:", change.previousValue);
      console.log("Current:", change.currentValue);
      console.log("First change:", change.firstChange);
    }

    if (changes["count"] && !changes["count"].firstChange) {
      console.log(
        "Count changed from",
        changes["count"].previousValue,
        "to",
        changes["count"].currentValue,
      );
    }
  }
}
```

#### ngOnInit

```typescript
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-user",
  standalone: true,
  template: `<div>{{ users.length }} users</div>`,
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
    // DON'T do heavy work here
    // Constructor should only be used for dependency injection
    console.log("Constructor called");
  }

  ngOnInit() {
    // Initialize component
    // Perfect place for:
    // - Fetching data
    // - Setting up subscriptions
    // - Initializing properties based on inputs

    console.log("ngOnInit called");
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
```

#### ngDoCheck

```typescript
import { Component, DoCheck } from "@angular/core";

@Component({
  selector: "app-user",
  standalone: true,
  template: `<div>{{ user.name }}</div>`,
})
export class UserComponent implements DoCheck {
  user = { name: "John", age: 30 };
  private oldAge = this.user.age;

  ngDoCheck() {
    // Called on every change detection run
    // Use for custom change detection logic
    // ⚠️ Be careful - runs very frequently!

    if (this.user.age !== this.oldAge) {
      console.log("Age changed from", this.oldAge, "to", this.user.age);
      this.oldAge = this.user.age;
    }
  }

  updateAge() {
    this.user.age++; // This won't trigger ngOnChanges
    // but will trigger ngDoCheck
  }
}
```

#### ngAfterViewInit / ngAfterViewChecked

```typescript
import {
  Component,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  ElementRef,
} from "@angular/core";

@Component({
  selector: "app-parent",
  standalone: true,
  template: `
    <input #nameInput type="text" />
    <p>Value: {{ inputValue }}</p>
  `,
})
export class ParentComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild("nameInput") nameInput!: ElementRef;
  inputValue = "";

  ngAfterViewInit() {
    // Called once after component's view is initialized
    // Can access @ViewChild elements here
    console.log("View initialized");

    // Safe to manipulate view elements
    this.nameInput.nativeElement.focus();
  }

  ngAfterViewChecked() {
    // Called after every check of component's view
    // ⚠️ Be careful - runs very frequently!
    // ⚠️ Don't update properties here (causes ExpressionChangedAfterItHasBeenCheckedError)
    // this.inputValue = this.nameInput.nativeElement.value; // DON'T DO THIS!
  }
}
```

#### ngOnDestroy

```typescript
import { Component, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-user",
  standalone: true,
  template: `<div>{{ user?.name }}</div>`,
})
export class UserComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  user: User | null = null;

  constructor(private userService: UserService) {
    // Subscribe to observable with cleanup
    this.userService
      .getUser()
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        this.user = user;
      });
  }

  ngOnDestroy() {
    // Called just before component is destroyed
    // Perfect place for:
    // - Unsubscribing from observables
    // - Detaching event handlers
    // - Cleaning up timers/intervals
    // - Saving state

    console.log("Component destroying");
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

#### Lifecycle Hooks Comparison

| Hook                      | Purpose                    | Called When                               | Use For                            |
| ------------------------- | -------------------------- | ----------------------------------------- | ---------------------------------- |
| **ngOnChanges**           | Respond to input changes   | Before ngOnInit & whenever @Input changes | React to input property changes    |
| **ngOnInit**              | Initialize component       | Once after first ngOnChanges              | Initial data fetching, setup       |
| **ngDoCheck**             | Custom change detection    | Every change detection cycle              | Custom change detection logic      |
| **ngAfterContentInit**    | After content projection   | Once after content projected              | Access ContentChild                |
| **ngAfterContentChecked** | After content checked      | After every content check                 | React to content changes           |
| **ngAfterViewInit**       | After view initialization  | Once after view initialized               | Access ViewChild, DOM manipulation |
| **ngAfterViewChecked**    | After view checked         | After every view check                    | React to view changes              |
| **ngOnDestroy**           | Cleanup before destruction | Just before component destroyed           | Unsubscribe, cleanup               |

#### Common Lifecycle Mistakes

❌ **Mistake 1: Heavy logic in constructor**

```typescript
// BAD
constructor(private userService: UserService) {
  this.userService.getUsers().subscribe(users => {
    this.users = users; // Inputs not initialized yet!
  });
}

// GOOD
ngOnInit() {
  this.userService.getUsers().subscribe(users => {
    this.users = users;
  });
}
```

❌ **Mistake 2: Updating properties in ngAfterViewChecked**

```typescript
// BAD - causes ExpressionChangedAfterItHasBeenCheckedError
ngAfterViewChecked() {
  this.value = this.input.nativeElement.value;
}

// GOOD
ngAfterViewInit() {
  this.input.nativeElement.addEventListener('input', (e) => {
    this.value = (e.target as HTMLInputElement).value;
  });
}
```

❌ **Mistake 3: Not cleaning up subscriptions**

```typescript
// BAD - memory leak
ngOnInit() {
  this.userService.getUsers().subscribe(users => {
    this.users = users;
  });
}

// GOOD
ngOnInit() {
  this.userService.getUsers()
    .pipe(takeUntilDestroyed(this.destroyRef)) // Modern approach
    .subscribe(users => {
      this.users = users;
    });
}
```

### 🟢 4.4 Dynamic Components

#### Creating Components Dynamically

```typescript
import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
} from "@angular/core";
import { UserComponent } from "./user.component";

@Component({
  selector: "app-dynamic",
  standalone: true,
  template: `
    <button (click)="loadComponent()">Load Component</button>
    <ng-container #container></ng-container>
  `,
})
export class DynamicComponent {
  @ViewChild("container", { read: ViewContainerRef })
  container!: ViewContainerRef;
  private componentRef?: ComponentRef<UserComponent>;

  loadComponent() {
    // Clear previous component
    this.container.clear();

    // Create component dynamically
    this.componentRef = this.container.createComponent(UserComponent);

    // Set inputs
    this.componentRef.instance.userId = 123;

    // Subscribe to outputs
    this.componentRef.instance.save.subscribe((user) => {
      console.log("User saved:", user);
    });
  }

  ngOnDestroy() {
    // Clean up
    this.componentRef?.destroy();
  }
}
```

### Key Takeaways: Components

✅ **Components are the building blocks** of Angular applications  
✅ **@Input() for parent→child** communication  
✅ **@Output() for child→parent** communication  
✅ **Lifecycle hooks** provide control at different stages  
✅ **ngOnInit** is the most commonly used hook for initialization  
✅ **ngOnDestroy** is crucial for preventing memory leaks  
✅ **ViewChild/ContentChild** for accessing child elements

### Interview Questions: Components

**Beginner:**

Q: What is a component in Angular?  
A: A component is a TypeScript class with a @Component decorator that controls a view (HTML template). It consists of logic, template, and styles.

Q: How do you pass data from parent to child component?  
A: Using @Input() decorator in the child component and property binding [] in the parent template.

Q: How do you emit events from child to parent?  
A: Using @Output() decorator with EventEmitter in the child component and event binding () in the parent template.

**Intermediate:**

Q: Explain the difference between constructor and ngOnInit.  
A: Constructor is for dependency injection and should be lightweight. ngOnInit is called after Angular sets up @Input properties and is the right place for initialization logic like data fetching.

Q: What is the difference between @ViewChild and @ContentChild?  
A: @ViewChild queries elements in the component's own template, while @ContentChild queries elements projected via <ng-content>.

Q: When would you use ngOnChanges vs ngDoCheck?  
A: ngOnChanges detects changes to @Input properties (primitive and reference changes). ngDoCheck runs on every change detection cycle and allows custom change detection logic for detecting object mutations.

**Advanced:**

Q: What causes ExpressionChangedAfterItHasBeenCheckedError and how do you fix it?  
A: This error occurs when a value changes after Angular has finished checking it in the current change detection cycle. It's common in ngAfterViewChecked. Fix by moving the logic to the appropriate lifecycle hook or using setTimeout/ChangeDetectorRef.

Q: How does Angular determine when to call lifecycle hooks?  
A: Angular calls lifecycle hooks during the change detection process based on the component's state - initialization, input changes, view/content checks, and destruction.

---

## 5. Standalone Components & Modern Angular

### 🟢 5.1 What are Standalone Components?

Standalone components were introduced in Angular 14 and became the recommended approach in Angular 15+. They eliminate the need for NgModules in most cases.

#### Traditional NgModule Approach

```typescript
// user.component.ts
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
})
export class UserComponent {}

// user.module.ts
@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, FormsModule],
  exports: [UserComponent],
})
export class UserModule {}

// app.module.ts
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UserModule, // Must import module
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

#### Modern Standalone Approach

```typescript
// user.component.ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-user",
  standalone: true, // 👈 Key difference
  imports: [CommonModule, FormsModule], // Direct imports
  templateUrl: "./user.component.html",
})
export class UserComponent {}

// app.component.ts
@Component({
  selector: "app-root",
  standalone: true,
  imports: [UserComponent], // Import component directly
  template: `<app-user />`,
})
export class AppComponent {}

// main.ts
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent, {
  providers: [
    // Application-wide providers
  ],
});
```

### 🟢 5.2 Standalone Components, Directives, and Pipes

#### Standalone Component

```typescript
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [CommonModule], // Import what you need
  template: `
    <div *ngFor="let user of users">
      {{ user.name }}
    </div>
  `,
})
export class UserListComponent {
  users = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
  ];
}
```

#### Standalone Directive

```typescript
import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
  standalone: true, // 👈 Standalone directive
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener("mouseenter")
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = "yellow";
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = "";
  }
}

// Usage in component
@Component({
  selector: "app-example",
  standalone: true,
  imports: [HighlightDirective], // Import directive
  template: `<p appHighlight>Hover me!</p>`,
})
export class ExampleComponent {}
```

#### Standalone Pipe

```typescript
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
  standalone: true, // 👈 Standalone pipe
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    return value.split("").reverse().join("");
  }
}

// Usage in component
@Component({
  selector: "app-example",
  standalone: true,
  imports: [ReversePipe], // Import pipe
  template: `<p>{{ "hello" | reverse }}</p>`, // olleh
})
export class ExampleComponent {}
```

### 🟢 5.3 Application Configuration

#### Modern Application Config

```typescript
// app.config.ts
import { ApplicationConfig } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { routes } from "./app.routes";
import { authInterceptor } from "./interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    // Other providers
    UserService,
    { provide: API_URL, useValue: "https://api.example.com" },
  ],
};

// main.ts
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
```

#### Environment Providers

```typescript
// app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    // Environment-specific providers
    importProvidersFrom(environment.production ? [] : [DevToolsModule]),
  ],
};
```

### 🟢 5.4 Routing with Standalone Components

```typescript
// app.routes.ts
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadComponent: () =>
      import("./home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "users",
    loadComponent: () =>
      import("./users/user-list.component").then((m) => m.UserListComponent),
    children: [
      {
        path: ":id",
        loadComponent: () =>
          import("./users/user-detail.component").then(
            (m) => m.UserDetailComponent,
          ),
      },
    ],
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.routes").then((m) => m.ADMIN_ROUTES),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./not-found/not-found.component").then(
        (m) => m.NotFoundComponent,
      ),
  },
];

// admin.routes.ts
import { Routes } from "@angular/router";

export const ADMIN_ROUTES: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./admin-dashboard.component").then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: "users",
    loadComponent: () =>
      import("./admin-users.component").then((m) => m.AdminUsersComponent),
  },
];
```

### 🟢 5.5 Migration from NgModules to Standalone

#### Step-by-Step Migration

```typescript
// BEFORE: NgModule-based component
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
})
export class UserComponent {}

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [UserComponent],
})
export class UserModule {}

// AFTER: Standalone component
@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule, FormsModule], // Move imports here
  templateUrl: "./user.component.html",
})
export class UserComponent {}

// No module needed! UserModule can be deleted
```

#### Migration Checklist

1. ✅ Add `standalone: true` to component decorator
2. ✅ Move `imports` from module to component
3. ✅ Update component imports in other components
4. ✅ Remove component from module declarations
5. ✅ If module is now empty, delete it
6. ✅ Update routing to use `loadComponent` instead of `loadChildren`
7. ✅ Update providers to use `provideX` functions
8. ✅ Update main.ts to use `bootstrapApplication`

#### Using Angular CLI for Migration

```bash
# Migrate a component to standalone
ng generate @angular/core:standalone --path=src/app/user/user.component.ts

# Migrate entire application
ng generate @angular/core:standalone
```

### 🟢 5.6 When to Still Use NgModules

While standalone components are the future, NgModules are still useful for:

1. **Third-party libraries** that haven't updated to standalone
2. **Feature modules** in very large applications (transitional period)
3. **Backwards compatibility** with older Angular versions
4. **Complex provider configurations** (though this is becoming less necessary)

```typescript
// Still valid: Using NgModule for feature grouping
@NgModule({
  imports: [
    CommonModule,
    UserListComponent, // Can mix standalone with NgModule
    UserDetailComponent,
  ],
  providers: [UserService, { provide: API_CONFIG, useValue: userApiConfig }],
})
export class UserFeatureModule {}
```

### Key Takeaways: Standalone Components

✅ **Standalone eliminates most NgModule boilerplate**  
✅ **Import dependencies directly** in component metadata  
✅ **Simpler mental model** - components are self-contained  
✅ **Better tree-shaking** - only import what you use  
✅ **Lazy loading is easier** with loadComponent  
✅ **Migration is gradual** - can mix NgModules and standalone  
✅ **Modern Angular default** - use standalone for new projects

### Interview Questions: Standalone Components

**Intermediate:**

Q: What are standalone components and why were they introduced?  
A: Standalone components (Angular 14+) are components that don't require NgModule. They simplify Angular applications by reducing boilerplate, improving tree-shaking, and making components truly self-contained with their own imports.

Q: How do you create a standalone component?  
A: Add `standalone: true` to the @Component decorator and include `imports` array for dependencies like CommonModule, FormsModule, or other components/directives/pipes.

Q: Can you mix standalone and NgModule-based components?  
A: Yes, Angular supports gradual migration. Standalone components can be used in NgModules, and NgModules can be imported in standalone components.

**Advanced:**

Q: What are the advantages of standalone components over NgModules?  
A: 1) Less boilerplate, 2) Better tree-shaking, 3) Clearer dependencies, 4) Easier lazy loading, 5) Simpler testing, 6) Better aligned with modern framework patterns.

Q: How does lazy loading work with standalone components?  
A: Use `loadComponent` in routes instead of `loadChildren`, directly loading the component without needing a module wrapper.

---

## 6. Templates and Data Binding

### 🟢 6.1 Template Syntax Overview

Angular templates use HTML with special syntax for dynamic content and behavior.

```
{{ }}        Interpolation
[ ]          Property binding
( )          Event binding
[( )]        Two-way binding
*            Structural directive (legacy)
@            Control flow (modern)
#            Template reference variable
```

### 🟢 6.2 Interpolation

```typescript
@Component({
  selector: "app-user",
  standalone: true,
  template: `
    <!-- String interpolation -->
    <h1>{{ title }}</h1>
    <p>{{ user.name }} - {{ user.email }}</p>

    <!-- Expressions -->
    <p>{{ 1 + 1 }}</p>
    <p>{{ getName() }}</p>
    <p>{{ user.age > 18 ? "Adult" : "Minor" }}</p>

    <!-- Template expressions -->
    <p>{{ user.name.toUpperCase() }}</p>
    <p>{{ users.length }} users</p>

    <!-- Cannot use: -->
    <!-- {{ let x = 1 }}  -->
    <!-- {{ user = newUser }}  -->
    <!-- {{ if (true) {} }}  -->
  `,
})
export class UserComponent {
  title = "User Management";
  user = { name: "John", email: "john@example.com", age: 25 };
  users = [{ name: "John" }, { name: "Jane" }];

  getName() {
    return this.user.name;
  }
}
```

### 🟢 6.3 Property Binding

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <!-- Element property binding -->
    <input [value]="userName" />
    <img [src]="imageUrl" />
    <button [disabled]="isDisabled">Click</button>

    <!-- Class binding -->
    <div [class.active]="isActive">Active</div>
    <div [class]="'btn btn-primary'">Button</div>
    <div [class]="{ active: isActive, disabled: isDisabled }">Multi</div>

    <!-- Style binding -->
    <p [style.color]="textColor">Colored text</p>
    <p [style.font-size.px]="fontSize">Sized text</p>
    <p [style]="{ color: 'red', 'font-size': '20px' }">Styled</p>

    <!-- Attribute binding (for attributes without DOM properties) -->
    <button [attr.aria-label]="buttonLabel">Click</button>
    <td [attr.colspan]="columnSpan">Cell</td>

    <!-- Component/directive input binding -->
    <app-user [userId]="currentUserId"></app-user>
  `,
})
export class ExampleComponent {
  userName = "John";
  imageUrl = "https://example.com/image.jpg";
  isDisabled = false;
  isActive = true;
  textColor = "blue";
  fontSize = 16;
  buttonLabel = "Submit form";
  columnSpan = 2;
  currentUserId = 123;
}
```

### 🟢 6.4 Event Binding

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <!-- Basic event binding -->
    <button (click)="onClick()">Click me</button>
    <input (input)="onInput($event)" />
    <input (keyup)="onKeyUp($event)" />
    <form (submit)="onSubmit($event)">
      <button type="submit">Submit</button>
    </form>

    <!-- Event with $event object -->
    <input (input)="userName = $any($event.target).value" />
    <button (click)="onClick($event)">Click</button>

    <!-- Multiple handlers -->
    <button (click)="onClick(); onOtherAction()">Click</button>

    <!-- Custom events from child components -->
    <app-child (save)="onSave($event)" (delete)="onDelete($event)"></app-child>

    <!-- Keyboard events -->
    <input (keyup.enter)="onEnter()" />
    <input (keydown.escape)="onEscape()" />
    <input (keyup.shift.a)="onShiftA()" />

    <!-- Mouse events -->
    <div (mouseenter)="onMouseEnter()" (mouseleave)="onMouseLeave()">
      Hover me
    </div>
  `,
})
export class ExampleComponent {
  userName = "";

  onClick(event?: MouseEvent) {
    console.log("Button clicked", event);
    event?.stopPropagation(); // Prevent event bubbling
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log("Input value:", target.value);
  }

  onKeyUp(event: KeyboardEvent) {
    console.log("Key:", event.key);
  }

  onSubmit(event: Event) {
    event.preventDefault(); // Prevent form submission
    console.log("Form submitted");
  }

  onSave(data: any) {
    console.log("Saved:", data);
  }

  onDelete(id: number) {
    console.log("Deleted:", id);
  }

  onEnter() {
    console.log("Enter key pressed");
  }

  onEscape() {
    console.log("Escape key pressed");
  }

  onMouseEnter() {
    console.log("Mouse entered");
  }

  onMouseLeave() {
    console.log("Mouse left");
  }
}
```

### 🟢 6.5 Two-Way Binding

```typescript
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-example",
  standalone: true,
  imports: [FormsModule],
  template: `
    <!-- Two-way binding with ngModel -->
    <input [(ngModel)]="userName" />
    <p>Hello, {{ userName }}!</p>

    <!-- Expanded form (same as above) -->
    <input [ngModel]="userName" (ngModelChange)="userName = $event" />

    <!-- Two-way binding with custom component -->
    <app-custom [(value)]="customValue"></app-custom>

    <!-- Expanded form -->
    <app-custom
      [value]="customValue"
      (valueChange)="customValue = $event"
    ></app-custom>
  `,
})
export class ExampleComponent {
  userName = "John";
  customValue = "initial";
}

// Custom component with two-way binding
@Component({
  selector: "app-custom",
  standalone: true,
  template: ` <input [value]="value" (input)="onInput($event)" /> `,
})
export class CustomComponent {
  @Input() value: string = "";
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.valueChange.emit(target.value);
  }
}
```

### 🟢 6.6 Modern Control Flow (@if, @for, @switch)

Angular 17+ introduced new control flow syntax that's more readable and performant than structural directives.

#### @if (Conditional Rendering)

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <!-- New @if syntax -->
    @if (isLoggedIn) {
      <p>Welcome back!</p>
    }

    <!-- @if with @else -->
    @if (user) {
      <p>Hello, {{ user.name }}</p>
    } @else {
      <p>Please log in</p>
    }

    <!-- @if with @else if -->
    @if (role === "admin") {
      <p>Admin Dashboard</p>
    } @else if (role === "moderator") {
      <p>Moderator Panel</p>
    } @else {
      <p>User View</p>
    }

    <!-- Complex conditions -->
    @if (user && user.age >= 18) {
      <p>Adult content</p>
    }
  `,
})
export class ExampleComponent {
  isLoggedIn = true;
  user = { name: "John", age: 25 };
  role = "admin";
}
```

#### Legacy \*ngIf (Still Supported)

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <!-- Legacy *ngIf -->
    <p *ngIf="isLoggedIn">Welcome back!</p>

    <!-- *ngIf with else -->
    <p *ngIf="user; else noUser">Hello, {{ user.name }}</p>
    <ng-template #noUser>
      <p>Please log in</p>
    </ng-template>

    <!-- *ngIf with as (assigning result) -->
    <div *ngIf="user$ | async as user">
      {{ user.name }}
    </div>
  `
})
```

#### @for (Iteration)

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <!-- New @for syntax with track -->
    @for (user of users; track user.id) {
      <div class="user-card">
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
      </div>
    }

    <!-- @for with @empty -->
    @for (user of users; track user.id) {
      <p>{{ user.name }}</p>
    } @empty {
      <p>No users found</p>
    }

    <!-- @for with index and other context variables -->
    @for (
      user of users;
      track user.id;
      let i = $index;
      let isFirst = $first;
      let isLast = $last
    ) {
      <div [class.first]="isFirst" [class.last]="isLast">
        {{ i + 1 }}. {{ user.name }}
      </div>
    }

    <!-- Context variables available: -->
    <!-- $index - current index -->
    <!-- $first - is first item -->
    <!-- $last - is last item -->
    <!-- $even - is even index -->
    <!-- $odd - is odd index -->
    <!-- $count - total count -->
  `,
})
export class ExampleComponent {
  users = [
    { id: 1, name: "John", email: "john@example.com" },
    { id: 2, name: "Jane", email: "jane@example.com" },
    { id: 3, name: "Bob", email: "bob@example.com" },
  ];
}
```

#### Legacy \*ngFor (Still Supported)

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <!-- Legacy *ngFor with trackBy -->
    <div *ngFor="let user of users; trackBy: trackByUserId">
      {{ user.name }}
    </div>

    <!-- *ngFor with context variables -->
    <div
      *ngFor="
        let user of users;
        let i = index;
        let isFirst = first;
        let isLast = last
      "
    >
      {{ i + 1 }}. {{ user.name }}
    </div>
  `,
})
export class ExampleComponent {
  users = [
    /* ... */
  ];

  trackByUserId(index: number, user: User): number {
    return user.id;
  }
}
```

#### track vs trackBy - Why It Matters

```typescript
// Without track - BAD (recreates ALL DOM elements on change)
@for (user of users; track user) {
  <div>{{ user.name }}</div>
}

// With track by id - GOOD (only updates changed elements)
@for (user of users; track user.id) {
  <div>{{ user.name }}</div>
}

// With track by index - USE CAREFULLY (ok for static lists)
@for (user of users; track $index) {
  <div>{{ user.name }}</div>
}
```

**Performance Impact:**

- ❌ No track: Angular recreates all DOM elements when array changes
- ✅ Track by unique ID: Angular only updates changed/added/removed items
- ⚠️ Track by index: Works but breaks if items are reordered

#### @switch (Switch Case)

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <!-- New @switch syntax -->
    @switch (status) {
      @case ("pending") {
        <p class="badge badge-warning">Pending</p>
      }
      @case ("approved") {
        <p class="badge badge-success">Approved</p>
      }
      @case ("rejected") {
        <p class="badge badge-danger">Rejected</p>
      }
      @default {
        <p class="badge badge-secondary">Unknown</p>
      }
    }

    <!-- Multiple cases -->
    @switch (userRole) {
      @case ("admin") {
        <app-admin-dashboard />
      }
      @case ("moderator") {
        <app-moderator-panel />
      }
      @case ("user") {
        <app-user-view />
      }
      @default {
        <app-guest-view />
      }
    }
  `,
})
export class ExampleComponent {
  status: "pending" | "approved" | "rejected" = "pending";
  userRole = "admin";
}
```

#### Legacy \*ngSwitch (Still Supported)

```typescript
@Component({
  imports: [CommonModule],
  template: `
    <div [ngSwitch]="status">
      <p *ngSwitchCase="'pending'" class="badge badge-warning">Pending</p>
      <p *ngSwitchCase="'approved'" class="badge badge-success">Approved</p>
      <p *ngSwitchCase="'rejected'" class="badge badge-danger">Rejected</p>
      <p *ngSwitchDefault class="badge badge-secondary">Unknown</p>
    </div>
  `
})
```

### 🟢 6.7 ng-template, ng-container, and ng-content

#### ng-template (Template Definition)

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Define reusable template -->
    <ng-template #loading>
      <div class="spinner">Loading...</div>
    </ng-template>

    <!-- Use template with ngIf -->
    <div *ngIf="isLoading; else content">
      <ng-container *ngTemplateOutlet="loading"></ng-container>
    </div>

    <ng-template #content>
      <p>Content loaded!</p>
    </ng-template>

    <!-- Template with context -->
    <ng-template #userTemplate let-user="user" let-index="index">
      <div>{{ index + 1 }}. {{ user.name }}</div>
    </ng-template>

    <ng-container
      *ngTemplateOutlet="userTemplate; context: { user: currentUser, index: 0 }"
    >
    </ng-container>
  `,
})
export class ExampleComponent {
  isLoading = true;
  currentUser = { name: "John" };
}
```

#### ng-container (Grouping Without DOM Element)

```typescript
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ng-container doesn't create a DOM element -->
    <ng-container *ngIf="showUsers">
      <h2>Users</h2>
      <p>User list here</p>
    </ng-container>

    <!-- Useful for multiple structural directives -->
    <ng-container *ngIf="isLoggedIn">
      <div *ngFor="let item of items">
        {{ item }}
      </div>
    </ng-container>

    <!-- Modern equivalent with @if -->
    @if (showUsers) {
      <h2>Users</h2>
      <p>User list here</p>
    }
  `
})
```

#### ng-content (Content Projection)

```typescript
// Card component with content projection
@Component({
  selector: "app-card",
  standalone: true,
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[card-header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
        <!-- Default projection -->
      </div>
      <div class="card-footer">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        border: 1px solid #ccc;
        border-radius: 4px;
      }
      .card-header {
        background: #f5f5f5;
        padding: 10px;
      }
      .card-body {
        padding: 20px;
      }
      .card-footer {
        background: #f5f5f5;
        padding: 10px;
      }
    `,
  ],
})
export class CardComponent {}

// Usage
@Component({
  selector: "app-example",
  standalone: true,
  imports: [CardComponent],
  template: `
    <app-card>
      <h3 card-header>Card Title</h3>
      <p>This is the card body content.</p>
      <p>More content here.</p>
      <button card-footer>Action</button>
    </app-card>
  `,
})
export class ExampleComponent {}
```

### Key Takeaways: Templates and Data Binding

✅ **{{ }} interpolation** for displaying dynamic values  
✅ **[ ] property binding** for setting element/component properties  
✅ **( ) event binding** for handling user interactions  
✅ **[( )] two-way binding** for form inputs (requires FormsModule)  
✅ **@if, @for, @switch** are modern control flow (Angular 17+)  
✅ **track is required** for @for (like trackBy for \*ngFor)  
✅ **ng-template** for reusable template definitions  
✅ **ng-container** for grouping without extra DOM elements  
✅ **ng-content** for content projection (transclusion)

### Common Template Mistakes

❌ **Forgetting track in @for**

```typescript
// BAD - poor performance
@for (user of users; track user) {
  <div>{{ user.name }}</div>
}

// GOOD - optimal performance
@for (user of users; track user.id) {
  <div>{{ user.name }}</div>
}
```

❌ **Complex logic in templates**

```typescript
// BAD - logic in template
<p>{{ user.firstName + ' ' + user.lastName + ' (' + user.age + ')' }}</p>

// GOOD - use method or getter
<p>{{ getUserDisplay() }}</p>

getUserDisplay() {
  return `${this.user.firstName} ${this.user.lastName} (${this.user.age})`;
}
```

❌ **Not using type-safe event binding**

```typescript
// BAD - using $any
<input (input)="onInput($any($event.target).value)">

// GOOD - proper typing
<input (input)="onInput($event)">

onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  console.log(target.value);
}
```

### Interview Questions: Templates

**Beginner:**

Q: What are the different types of data binding in Angular?  
A: 1) Interpolation {{ }}, 2) Property binding [ ], 3) Event binding ( ), 4) Two-way binding [( )]

Q: What is the difference between property binding and attribute binding?  
A: Property binding sets DOM properties [disabled], while attribute binding sets HTML attributes [attr.aria-label]. Use attribute binding for attributes that don't have corresponding DOM properties.

**Intermediate:**

Q: Explain the difference between @if and *ngIf.  
A: @if is the modern Angular 17+ control flow syntax with better performance and readability. *ngIf is the legacy structural directive. Both achieve conditional rendering, but @if is now recommended.

Q: Why is track/trackBy important in loops?  
A: track/trackBy tells Angular how to identify unique items in a list. Without it, Angular recreates all DOM elements when the array changes. With it, Angular only updates changed items, dramatically improving performance.

Q: What is ng-content used for?  
A: ng-content enables content projection (transclusion), allowing parent components to pass content into child component templates. Use select attribute for multi-slot projection.

**Advanced:**

Q: When would you use ng-template over a regular template?  
A: Use ng-template for: 1) Conditional template rendering with _ngIf else, 2) Reusable template definitions, 3) Passing templates to components, 4) Template context with let-_ variables.

Q: How does Angular's template compiler optimize templates?  
A: Angular's Ivy compiler converts templates to optimized instructions. It performs tree-shaking, removes unused code, and generates minimal update instructions for change detection.

---

## 7. Angular Signals

### 🟢 7.1 What are Signals?

Signals are a **reactive primitive** introduced in Angular 16 that provide a new way to manage state and handle reactivity in Angular applications.

#### Why Signals?

**Problems with traditional change detection:**

- Zone.js runs change detection on entire component tree
- Performance overhead for large applications
- Difficult to optimize
- No fine-grained reactivity

**Signals solve these problems:**

- ✅ Fine-grained reactivity
- ✅ Predictable updates
- ✅ Better performance
- ✅ Simpler mental model
- ✅ No Zone.js dependency (future)
- ✅ Automatic dependency tracking

#### Basic Signal Example

```typescript
import { Component, signal } from "@angular/core";

@Component({
  selector: "app-counter",
  standalone: true,
  template: `
    <div>
      <p>Count: {{ count() }}</p>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
      <button (click)="reset()">Reset</button>
    </div>
  `,
})
export class CounterComponent {
  // Create a signal with initial value
  count = signal(0);

  increment() {
    // Update signal value
    this.count.set(this.count() + 1);
    // OR use update()
    // this.count.update(value => value + 1);
  }

  decrement() {
    this.count.update((value) => value - 1);
  }

  reset() {
    this.count.set(0);
  }
}
```

### 🟢 7.2 Creating and Updating Signals

#### signal() - Create a Writable Signal

```typescript
import { signal } from "@angular/core";

// Primitive values
const count = signal(0);
const name = signal("John");
const isActive = signal(true);

// Objects
const user = signal({ id: 1, name: "John", email: "john@example.com" });

// Arrays
const users = signal<User[]>([]);

// With type annotation
const status = signal<"idle" | "loading" | "success" | "error">("idle");
```

#### Reading Signal Values

```typescript
// Call signal as a function to read value
console.log(count());  // 0
console.log(name());   // 'John'
console.log(user());   // { id: 1, name: 'John', email: 'john@example.com' }

// In template - signal is called automatically
<p>{{ count() }}</p>
<p>{{ user().name }}</p>
```

#### Updating Signals: set() vs update() vs mutate()

```typescript
// set() - Replace the entire value
count.set(10);
name.set("Jane");
user.set({ id: 2, name: "Jane", email: "jane@example.com" });

// update() - Update based on previous value
count.update((value) => value + 1);
count.update((value) => value * 2);

// update() with objects
user.update((current) => ({
  ...current,
  name: "Jane Doe",
}));

// update() with arrays
users.update((current) => [...current, newUser]);
users.update((current) => current.filter((u) => u.id !== userId));

// mutate() - Mutate objects/arrays in place (Angular 17.1+)
user.mutate((value) => {
  value.name = "Jane Doe"; // Direct mutation
});

users.mutate((value) => {
  value.push(newUser); // Direct array mutation
});
```

### 🟢 7.3 Computed Signals

Computed signals derive their value from other signals and automatically update when dependencies change.

```typescript
import { Component, signal, computed } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  template: `
    <div>
      <h2>Shopping Cart</h2>

      <div *ngFor="let item of items()">
        <p>{{ item.name }}: ${{ item.price }} x {{ item.quantity }}</p>
      </div>

      <p>Subtotal: ${{ subtotal() }}</p>
      <p>Tax (10%): ${{ tax() }}</p>
      <p><strong>Total: ${{ total() }}</strong></p>
      <p>Items: {{ itemCount() }}</p>
    </div>
  `
})
export class ShoppingCartComponent {
  items = signal([
    { name: 'Book', price: 20, quantity: 2 },
    { name: 'Pen', price: 5, quantity: 3 }
  ]);

  // Computed signals automatically track dependencies
  subtotal = computed(() => {
    return this.items().reduce((sum, item) =>
      sum + (item.price * item.quantity), 0
    );
  });

  tax = computed(() => this.subtotal() * 0.1);

  total = computed(() => this.subtotal() + this.tax());

  itemCount = computed(() => {
    return this.items().reduce((count, item) =>
      count + item.quantity, 0
    );
  });

  // Computed can depend on multiple signals
  discount = signal(0);
  finalPrice = computed(() => this.total() - this.discount());
}
```

**Key Points about Computed Signals:**

- ✅ Automatically track dependencies
- ✅ Memoized - only recomputed when dependencies change
- ✅ Read-only - cannot be set directly
- ✅ Lazy evaluation - only computed when read
- ✅ Can depend on multiple signals

```typescript
// Computed signals are read-only
const count = signal(0);
const doubled = computed(() => count() * 2);

doubled.set(10); // ❌ Error: computed signals are read-only
count.set(5); // ✅ doubled automatically becomes 10
```

### 🟢 7.4 Effects

Effects run side effects when signal values change.

```typescript
import { Component, signal, effect } from "@angular/core";

@Component({
  selector: "app-user-profile",
  standalone: true,
  template: `
    <input [(ngModel)]="searchQuery" placeholder="Search users" />
    <p>Searching for: {{ searchQuery() }}</p>
  `,
})
export class UserProfileComponent {
  searchQuery = signal("");

  constructor() {
    // Effect runs when searchQuery changes
    effect(() => {
      const query = this.searchQuery();
      console.log("Search query changed:", query);

      // Perform side effects
      if (query.length > 2) {
        this.searchUsers(query);
      }
    });

    // Effect with cleanup
    effect((onCleanup) => {
      const subscription = this.userService.getUsers().subscribe((users) => {
        console.log("Users loaded:", users);
      });

      // Cleanup when effect re-runs or component destroys
      onCleanup(() => {
        subscription.unsubscribe();
      });
    });

    // Effect runs only in certain contexts
    effect(
      () => {
        console.log("User count:", this.users().length);
      },
      { allowSignalWrites: true },
    ); // Allow writing to signals in effect
  }

  searchUsers(query: string) {
    // API call
  }
}
```

**Effect Best Practices:**

✅ **DO use effects for:**

- Logging/debugging
- Synchronizing with external systems
- LocalStorage updates
- Analytics tracking
- DOM manipulation (with caution)

❌ **DON'T use effects for:**

- Deriving values (use computed instead)
- Template updates (automatic with signals)
- Complex state orchestration
- Replacing lifecycle hooks unnecessarily

### 🟢 7.5 Signal Inputs and Outputs (Angular 17.1+)

#### Signal-Based Inputs

```typescript
import { Component, input, Input } from "@angular/core";

@Component({
  selector: "app-user-card",
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ userName() }}</h3>
      <p>Age: {{ userAge() }}</p>
      <p>Role: {{ role() }}</p>
    </div>
  `,
})
export class UserCardComponent {
  // Modern signal-based input
  userName = input<string>(""); // Optional with default
  userAge = input.required<number>(); // Required input
  role = input<string>("user"); // With default value

  // Can use in computed signals
  displayName = computed(() => {
    return `${this.userName()} (${this.role()})`;
  });

  // Traditional @Input still works
  @Input() email: string = "";
}

// Usage
@Component({
  template: `
    <app-user-card [userName]="'John Doe'" [userAge]="30" [role]="'admin'" />
  `,
})
export class ParentComponent {}
```

#### Signal-Based Outputs

```typescript
import { Component, output } from "@angular/core";

@Component({
  selector: "app-user-form",
  standalone: true,
  template: `
    <form (submit)="handleSubmit()">
      <input [(ngModel)]="name" placeholder="Name" />
      <button type="submit">Save</button>
      <button type="button" (click)="handleCancel()">Cancel</button>
    </form>
  `,
})
export class UserFormComponent {
  name = signal("");

  // Modern signal-based output
  save = output<{ name: string }>();
  cancel = output<void>();

  handleSubmit() {
    this.save.emit({ name: this.name() });
  }

  handleCancel() {
    this.cancel.emit();
  }
}

// Usage
@Component({
  template: ` <app-user-form (save)="onSave($event)" (cancel)="onCancel()" /> `,
})
export class ParentComponent {
  onSave(data: { name: string }) {
    console.log("User saved:", data);
  }

  onCancel() {
    console.log("Cancelled");
  }
}
```

### 🟢 7.6 Model Inputs (Two-Way Binding with Signals)

```typescript
import { Component, model } from "@angular/core";

@Component({
  selector: "app-custom-input",
  standalone: true,
  template: `
    <input
      [value]="value()"
      (input)="value.set($any($event.target).value)"
      placeholder="Enter text"
    />
  `,
})
export class CustomInputComponent {
  // model() creates a writable signal with two-way binding
  value = model<string>("");
}

// Usage with two-way binding
@Component({
  selector: "app-parent",
  standalone: true,
  imports: [CustomInputComponent],
  template: `
    <app-custom-input [(value)]="searchText" />
    <p>Search: {{ searchText() }}</p>
  `,
})
export class ParentComponent {
  searchText = signal("");
}
```

### 🟢 7.7 Signals vs RxJS

#### When to Use Signals vs RxJS

| Feature                   | Signals             | RxJS              |
| ------------------------- | ------------------- | ----------------- |
| **State Management**      | ✅ Excellent        | ✅ Good           |
| **Synchronous Values**    | ✅ Perfect          | ⚠️ Possible       |
| **Asynchronous Streams**  | ❌ Not designed for | ✅ Perfect        |
| **Complex Operators**     | ❌ Limited          | ✅ Extensive      |
| **Time-Based Operations** | ❌ Not supported    | ✅ Built-in       |
| **HTTP Requests**         | ❌ Not designed for | ✅ Perfect        |
| **Event Streams**         | ❌ Limited          | ✅ Perfect        |
| **Template Updates**      | ✅ Automatic        | ⚠️ Need AsyncPipe |
| **Performance**           | ✅ Very efficient   | ⚠️ Can be heavy   |
| **Learning Curve**        | ✅ Easy             | ⚠️ Steep          |

#### Signals Example

```typescript
@Component({
  selector: "app-counter",
  standalone: true,
  template: ` <button (click)="increment()">Count: {{ count() }}</button> `,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((v) => v + 1);
  }
}
```

#### RxJS Example

```typescript
@Component({
  selector: "app-counter",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <button (click)="increment()">Count: {{ count$ | async }}</button>
  `,
})
export class CounterComponent {
  private countSubject = new BehaviorSubject(0);
  count$ = this.countSubject.asObservable();

  increment() {
    this.countSubject.next(this.countSubject.value + 1);
  }
}
```

**Use Signals for:**

- ✅ Component state
- ✅ Derived/computed values
- ✅ Synchronous data
- ✅ Form state
- ✅ UI state (loading, errors)

**Use RxJS for:**

- ✅ HTTP requests
- ✅ WebSocket streams
- ✅ Complex async operations
- ✅ Debouncing/throttling
- ✅ Combining multiple async sources
- ✅ Time-based operations

### 🟢 7.8 Interoperability: Signals ↔ RxJS

#### toSignal() - Convert Observable to Signal

```typescript
import { Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-users",
  standalone: true,
  template: `
    @if (users(); as userList) {
      @for (user of userList; track user.id) {
        <p>{{ user.name }}</p>
      }
    }

    @if (loading()) {
      <p>Loading...</p>
    }

    @if (error()) {
      <p>Error: {{ error() }}</p>
    }
  `,
})
export class UsersComponent {
  private http = inject(HttpClient);

  // Convert Observable to Signal
  users = toSignal(this.http.get<User[]>("/api/users"), {
    initialValue: [] as User[],
  });

  // With loading state
  private users$ = this.http.get<User[]>("/api/users");
  usersSignal = toSignal(this.users$);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    this.users$.subscribe({
      next: () => this.loading.set(false),
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message);
      },
    });
  }
}
```

#### toObservable() - Convert Signal to Observable

```typescript
import { Component, signal } from "@angular/core";
import { toObservable } from "@angular/core/rxjs-interop";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Component({
  selector: "app-search",
  standalone: true,
  template: `
    <input [(ngModel)]="searchQuery" placeholder="Search" />
    <div *ngFor="let result of results()">{{ result }}</div>
  `,
})
export class SearchComponent {
  searchQuery = signal("");
  results = signal<string[]>([]);

  constructor() {
    // Convert signal to observable for RxJS operators
    const searchQuery$ = toObservable(this.searchQuery);

    searchQuery$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.searchService.search(query)),
      )
      .subscribe((results) => {
        this.results.set(results);
      });
  }
}
```

### 🟢 7.9 Signals and Change Detection

#### How Signals Improve Change Detection

```typescript
// Without Signals (Zone.js change detection)
@Component({
  template: `
    <p>{{ count }}</p>
    <button (click)="increment()">+</button>
  `,
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
    // Zone.js triggers change detection for ENTIRE component tree
  }
}

// With Signals (Fine-grained reactivity)
@Component({
  template: `
    <p>{{ count() }}</p>
    <button (click)="increment()">+</button>
  `,
})
export class CounterComponent {
  count = signal(0);

  increment() {
    this.count.update((v) => v + 1);
    // Only updates the specific binding, not entire component
  }
}
```

#### OnPush Strategy with Signals

```typescript
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-optimized",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimal for signals
  template: `
    <p>{{ count() }}</p>
    <p>{{ doubled() }}</p>
  `,
})
export class OptimizedComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);

  // Signals work perfectly with OnPush
  // No need for ChangeDetectorRef.markForCheck()
}
```

### Key Takeaways: Angular Signals

✅ **Signals are reactive primitives** for state management  
✅ **signal() creates writable signals** with set(), update(), mutate()  
✅ **computed() creates derived signals** that auto-update  
✅ **effect() runs side effects** when signals change  
✅ **Fine-grained reactivity** improves performance  
✅ **input(), output(), model()** for modern component APIs  
✅ **toSignal() and toObservable()** for RxJS interop  
✅ **Use signals for state**, RxJS for async streams

### Common Signal Mistakes

❌ **Using effects for derived state**

```typescript
// BAD - use computed instead
count = signal(0);
doubled = signal(0);

constructor() {
  effect(() => {
    this.doubled.set(this.count() * 2);
  });
}

// GOOD - use computed
count = signal(0);
doubled = computed(() => this.count() * 2);
```

❌ **Not tracking dependencies properly**

```typescript
// BAD - signal not called, no reactivity
items = signal([1, 2, 3]);
firstItem = computed(() => this.items[0]); // Won't update!

// GOOD - call signal to track
firstItem = computed(() => this.items()[0]); // Updates when items change
```

❌ **Mutating signal values directly**

```typescript
// BAD - direct mutation doesn't trigger updates
user = signal({ name: "John" });
user().name = "Jane"; // Won't update template!

// GOOD - use update() or mutate()
user.update((u) => ({ ...u, name: "Jane" }));
// OR
user.mutate((u) => {
  u.name = "Jane";
});
```

### Interview Questions: Signals

**Intermediate:**

Q: What are Angular Signals and why were they introduced?  
A: Signals are reactive primitives for state management introduced in Angular 16. They enable fine-grained reactivity, better performance than Zone.js-based change detection, and a simpler mental model for managing state.

Q: What's the difference between signal() and computed()?  
A: signal() creates a writable signal that can be updated with set()/update(). computed() creates a read-only signal that derives its value from other signals and automatically updates when dependencies change.

Q: When should you use Signals vs RxJS Observables?  
A: Use Signals for synchronous state management and derived values. Use RxJS for asynchronous operations, HTTP requests, event streams, and complex transformations with operators like debounce, switchMap, etc.

**Advanced:**

Q: How do Signals improve Angular's change detection?  
A: Signals enable fine-grained reactivity. Instead of checking the entire component tree (Zone.js), Angular only updates specific bindings that depend on changed signals. This dramatically improves performance, especially in large applications.

Q: Explain the difference between set(), update(), and mutate() for signals.  
A: set() replaces the entire value. update() receives the current value and returns a new one (functional). mutate() allows in-place mutation of objects/arrays. Use set() for primitives, update() for immutable updates, mutate() for performance with large objects.

Q: How do you handle async data with Signals?  
A: Use toSignal() to convert Observables to Signals, or use effects to update signals when async operations complete. For HTTP requests, the pattern is: Observable → subscribe → update signal with result.

---

## 8. Change Detection

### 🟢 8.1 What is Change Detection?

Change detection is the process by which Angular checks if application data has changed and updates the view accordingly.

#### Why Change Detection is Needed

```typescript
// JavaScript doesn't automatically notify when data changes
let name = "John";
console.log(name); // John

name = "Jane";
// No automatic UI update - we need change detection!
```

#### How Change Detection Works

```
User Action / Async Operation
           ↓
    Zone.js Intercepts
           ↓
  Angular Change Detection
           ↓
   Check Component Tree
           ↓
   Update DOM if Needed
```

### 🟢 8.2 When Change Detection Runs

Angular runs change detection when:

1. **Browser Events** (click, input, keyup, etc.)
2. **setTimeout() / setInterval()**
3. **HTTP Requests** complete
4. **Promise Resolution**
5. **Async Operations** via Zone.js

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  template: `
    <p>{{ count }}</p>
    <button (click)="increment()">Click</button>
  `,
})
export class ExampleComponent {
  count = 0;

  increment() {
    this.count++;
    // Change detection automatically runs after this click handler
  }

  ngOnInit() {
    // Change detection runs after setTimeout
    setTimeout(() => {
      this.count++;
    }, 1000);

    // Change detection runs after HTTP completes
    this.http.get("/api/data").subscribe((data) => {
      this.count++; // View will update
    });

    // NO change detection for manual update
    const interval = setInterval(() => {
      this.count++; // View updates because of setInterval
    }, 1000);
  }
}
```

### 🟢 8.3 Zone.js

#### What is Zone.js?

Zone.js is a library that intercepts asynchronous operations and notifies Angular when to run change detection.

```typescript
// Zone.js patches browser APIs
// Original
const originalSetTimeout = window.setTimeout;

// Patched by Zone.js
window.setTimeout = function (callback, delay) {
  return originalSetTimeout(() => {
    callback();
    // Zone.js notifies Angular to run change detection here
  }, delay);
};
```

#### Running Code Outside Zone.js

```typescript
import { Component, NgZone } from "@angular/core";

@Component({
  selector: "app-example",
  standalone: true,
  template: `<p>{{ count }}</p>`,
})
export class ExampleComponent {
  count = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Run outside Angular zone (no change detection)
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.count++; // Won't update view automatically
        console.log("Count:", this.count);
      }, 1000);
    });

    // Run inside Angular zone (triggers change detection)
    this.ngZone.run(() => {
      this.count = 100; // View will update
    });
  }
}
```

**Use Cases for Running Outside Zone:**

- Heavy computations that don't affect UI
- High-frequency updates (animations, scroll)
- Third-party libraries that trigger too many events
- WebSocket messages that don't always need UI updates

### 🟢 8.4 Change Detection Strategies

#### Default Strategy

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-default",
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.Default  // This is the default
  template: `
    <p>{{ user.name }}</p>
    <p>{{ count }}</p>
  `,
})
export class DefaultComponent {
  user = { name: "John" };
  count = 0;

  updateUser() {
    // This triggers change detection
    this.user.name = "Jane";
  }

  updateCount() {
    // This triggers change detection
    this.count++;
  }
}
```

**Default Strategy Behavior:**

- Checks component on every change detection cycle
- Checks all properties (even if unchanged)
- Works for all update scenarios
- Less performant for large apps

#### OnPush Strategy

```typescript
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
  selector: "app-onpush",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush, // 👈 OnPush strategy
  template: `
    <p>{{ user.name }}</p>
    <p>{{ count }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class OnPushComponent {
  @Input() user!: User;
  count = 0;

  increment() {
    this.count++; // ✅ Event triggers change detection
  }

  updateUserMutation() {
    this.user.name = "Jane"; // ❌ Won't trigger change detection (mutation)
  }

  updateUserImmutably() {
    this.user = { ...this.user, name: "Jane" }; // ✅ Triggers change detection (new reference)
  }
}
```

**OnPush Triggers Change Detection When:**

1. ✅ **@Input() reference changes** (not mutation)
2. ✅ **Event handler** executes (click, input, etc.)
3. ✅ **Async pipe** receives new value
4. ✅ **Signal changes** (Angular 16+)
5. ✅ **Manual trigger** with ChangeDetectorRef

**OnPush Does NOT Trigger When:**

1. ❌ **Mutating @Input() objects/arrays**
2. ❌ **setTimeout/setInterval** inside component
3. ❌ **Parent component changes** (unless @Input changes)
4. ❌ **Observable emits** without async pipe

### 🟢 8.5 ChangeDetectorRef

Manual control over change detection.

```typescript
import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from "@angular/core";

@Component({
  selector: "app-manual-cd",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p>{{ time }}</p>
    <button (click)="detach()">Detach</button>
    <button (click)="reattach()">Reattach</button>
  `,
})
export class ManualCdComponent {
  time = new Date();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Update time every second
    setInterval(() => {
      this.time = new Date();

      // Manually trigger change detection (OnPush with setTimeout needs this)
      this.cdr.markForCheck();
    }, 1000);
  }

  detach() {
    // Stop change detection for this component
    this.cdr.detach();
  }

  reattach() {
    // Resume change detection
    this.cdr.reattach();
  }

  forceUpdate() {
    // Immediately run change detection
    this.cdr.detectChanges();
  }
}
```

**ChangeDetectorRef Methods:**

| Method               | Purpose                                | Use Case                  |
| -------------------- | -------------------------------------- | ------------------------- |
| **markForCheck()**   | Mark component and ancestors for check | OnPush with async updates |
| **detectChanges()**  | Run change detection immediately       | Testing, force update     |
| **detach()**         | Detach from change detection           | Performance optimization  |
| **reattach()**       | Reattach to change detection           | After detach()            |
| **checkNoChanges()** | Verify no changes (dev mode)           | Debugging                 |

### 🟢 8.6 Change Detection Tree

```
AppComponent (Default)
    ├── HeaderComponent (OnPush)
    │   └── UserMenuComponent (OnPush)
    ├── MainComponent (Default)
    │   ├── SidebarComponent (OnPush)
    │   └── ContentComponent (Default)
    └── FooterComponent (OnPush)

Change Detection Flow:
1. Event triggers in ContentComponent
2. Angular checks from AppComponent down
3. OnPush components skip unless:
   - Input changed
   - Event in component
   - Async pipe updated
   - markForCheck() called
```

### 🟢 8.7 ExpressionChangedAfterItHasBeenCheckedError

This is one of the most common Angular errors!

#### What Causes It?

```typescript
@Component({
  selector: "app-parent",
  standalone: true,
  imports: [ChildComponent],
  template: ` <app-child [data]="childData"></app-child> `,
})
export class ParentComponent implements AfterViewInit {
  childData = "initial";

  ngAfterViewInit() {
    // ❌ This causes the error in development mode
    this.childData = "changed";
    // Change detection already ran, but we changed a value
    // that affects child component
  }
}
```

#### Why It Happens

```
1. Change detection runs
2. All bindings checked
3. Lifecycle hook executes (ngAfterViewInit)
4. Property changes that affects already-checked binding
5. Development mode runs second check
6. Detects inconsistency
7. Throws error
```

#### How to Fix It

```typescript
// Fix 1: Use setTimeout (next tick)
ngAfterViewInit() {
  setTimeout(() => {
    this.childData = 'changed';  // ✅ Runs in next change detection cycle
  }, 0);
}

// Fix 2: Use ChangeDetectorRef
constructor(private cdr: ChangeDetectorRef) {}

ngAfterViewInit() {
  this.childData = 'changed';
  this.cdr.detectChanges();  // ✅ Manually trigger change detection
}

// Fix 3: Move logic to appropriate lifecycle hook
ngOnInit() {
  this.childData = 'changed';  // ✅ Before view is checked
}

// Fix 4: Use Signals (Angular 16+)
childData = signal('initial');

ngAfterViewInit() {
  this.childData.set('changed');  // ✅ Signals handle this correctly
}
```

### 🟢 8.8 Change Detection Performance Optimization

#### 1. Use OnPush Strategy

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush, // 👈 Biggest performance win
})
export class OptimizedComponent {}
```

#### 2. Use Immutable Data Patterns

```typescript
// ❌ BAD - Mutation (OnPush won't detect)
this.user.name = "Jane";

// ✅ GOOD - Immutable update
this.user = { ...this.user, name: "Jane" };

// ✅ Arrays
this.items = [...this.items, newItem];
this.items = this.items.filter((i) => i.id !== id);
```

#### 3. Use trackBy for Lists

```typescript
// ❌ BAD - Recreates all DOM elements
@for (item of items; track item) {
  <div>{{ item.name }}</div>
}

// ✅ GOOD - Only updates changed elements
@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}
```

#### 4. Use Signals for State

```typescript
// ✅ Signals provide fine-grained reactivity
count = signal(0);
doubled = computed(() => this.count() * 2);
```

#### 5. Detach Heavy Components

```typescript
constructor(private cdr: ChangeDetectorRef) {
  // Detach from automatic change detection
  this.cdr.detach();
}

update() {
  // Manually trigger when needed
  this.cdr.detectChanges();
}
```

#### 6. Use Pure Pipes

```typescript
@Pipe({
  name: "expensive",
  pure: true, // 👈 Only recalculates when input changes
  standalone: true,
})
export class ExpensivePipe implements PipeTransform {
  transform(value: any): any {
    // Expensive operation
    return value;
  }
}
```

### Key Takeaways: Change Detection

✅ **Change detection updates the view** when data changes  
✅ **Zone.js intercepts async operations** and triggers change detection  
✅ **Default strategy checks all components** on every cycle  
✅ **OnPush strategy is more efficient** - only checks when inputs/events change  
✅ **Use immutable patterns** with OnPush  
✅ **Signals provide fine-grained reactivity** without Zone.js overhead  
✅ **ChangeDetectorRef** for manual control  
✅ **ExpressionChangedError** happens when values change after checking

### Common Change Detection Mistakes

❌ **Mutating objects with OnPush**

```typescript
// BAD - won't trigger change detection
this.user.name = "Jane";

// GOOD
this.user = { ...this.user, name: "Jane" };
```

❌ **Heavy computations in templates**

```typescript
// BAD - runs on every change detection
<p>{{ calculateExpensiveValue() }}</p>

// GOOD - use computed signal or pipe
<p>{{ expensiveValue() }}</p>
expensiveValue = computed(() => this.calculate());
```

❌ **Not using trackBy**

```typescript
// BAD
<div *ngFor="let item of items">{{ item.name }}</div>

// GOOD
<div *ngFor="let item of items; trackBy: trackById">{{ item.name }}</div>
trackById(index: number, item: any) { return item.id; }
```

### Interview Questions: Change Detection

**Intermediate:**

Q: What is change detection in Angular?  
A: Change detection is Angular's mechanism to synchronize the application model with the view. It checks if data has changed and updates the DOM accordingly. It runs automatically after browser events, async operations, and timers.

Q: What's the difference between Default and OnPush change detection strategies?  
A: Default checks every component on every change detection cycle. OnPush only checks a component when its @Input references change, events occur within it, an async pipe receives a value, or markForCheck() is called. OnPush is more performant.

Q: What is Zone.js and what role does it play?  
A: Zone.js is a library that patches asynchronous APIs (setTimeout, HTTP, promises) to notify Angular when async operations complete, triggering change detection automatically.

**Advanced:**

Q: Explain how to fix ExpressionChangedAfterItHasBeenCheckedError.  
A: This error occurs when a value changes after Angular has checked it. Fix by: 1) Using setTimeout to defer changes, 2) Calling detectChanges() manually, 3) Moving logic to earlier lifecycle hooks like ngOnInit, or 4) Using Signals which handle this automatically.

Q: How do Signals improve change detection performance?  
A: Signals enable fine-grained reactivity. Instead of checking entire component trees (Zone.js), Angular only updates specific DOM nodes that depend on changed signals. This is much more efficient, especially in large applications.

Q: When would you detach a component from change detection?  
A: Detach when you have components that rarely change or update on their own schedule (e.g., real-time charts, animations, third-party widgets). You manually trigger detectChanges() when needed, avoiding unnecessary checks.

Q: What happens when you use OnPush with Observable data?  
A: If you don't use the async pipe, OnPush won't detect changes when the Observable emits. You must either use async pipe (which marks for check automatically) or manually call markForCheck() in your subscription.

---

## 9. Dependency Injection

### 🟢 9.1 What is Dependency Injection?

Dependency Injection (DI) is a design pattern where objects receive their dependencies from an external source rather than creating them directly.

#### Without DI

```typescript
// ❌ BAD - Hard-coded dependency
export class UserService {
  private http: HttpClient;

  constructor() {
    this.http = new HttpClient(); // Creates dependency itself
  }
}

export class UserComponent {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(); // Creates dependency itself
  }
}
```

#### With DI

```typescript
// ✅ GOOD - Dependencies injected
@Injectable()
export class UserService {
  constructor(private http: HttpClient) {} // Injected
}

@Component({
  selector: "app-user",
  standalone: true,
})
export class UserComponent {
  constructor(private userService: UserService) {} // Injected
}
```

### 🟢 9.2 Benefits of Dependency Injection

1. **Decoupling**: Components don't know how to create dependencies
2. **Testability**: Easy to mock dependencies for testing
3. **Reusability**: Services can be shared across components
4. **Configuration**: Dependencies can be configured globally
5. **Lifetime Management**: Angular manages service lifetimes

### 🟢 9.3 Injectors and Provider Hierarchy

```
Application (Root) Injector
    ├── Module Injector (if using NgModule)
    ├── Environment Injector
    ├── Element Injector (Component-level)
    └── Platform Injector
```

#### Injector Hierarchy Example

```typescript
// 1. Root injector (singleton service)
@Injectable({ providedIn: "root" })
export class UserService {}

// 2. Module-level injector
@NgModule({
  providers: [UserService], // Module-scoped singleton
})
export class UserModule {}

// 3. Component-level injector
@Component({
  selector: "app-user",
  providers: [UserService], // Component-scoped instance
})
export class UserComponent {
  // Gets component-specific instance
}

// 4. View-level injector (new in Angular 14)
@Component({
  selector: "app-user",
  viewProviders: [UserService], // Available only to component and view children
})
export class UserComponent {}
```

### 🟢 9.4 Modern DI with `inject()`

Angular 14+ introduced the `inject()` function as an alternative to constructor injection.

#### Constructor Injection (Traditional)

```typescript
@Injectable()
export class UserService {
  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    @Optional() private config?: AppConfig,
  ) {}
}

@Component({
  selector: "app-user",
  standalone: true,
})
export class UserComponent {
  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    @Inject(APP_CONFIG) private config: AppConfig,
  ) {}
}
```

#### Functional Injection with `inject()` (Modern)

```typescript
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  // Functional injection
  private http = inject(HttpClient);
  private logger = inject(LoggerService);
  private config = inject(APP_CONFIG, { optional: true });

  constructor() {
    // Dependencies available here
    console.log("HTTP:", this.http);
  }
}

@Component({
  selector: "app-user",
  standalone: true,
})
export class UserComponent {
  // Functional injection in components
  private userService = inject(UserService);
  private cdr = inject(ChangeDetectorRef);
  private config = inject(APP_CONFIG);

  // Or constructor injection still works
  constructor() {
    console.log("Service:", this.userService);
  }
}
```

#### `inject()` Usage Patterns

```typescript
// 1. Basic injection
const service = inject(MyService);

// 2. Optional injection
const service = inject(MyService, { optional: true });

// 3. Injection with default value
const service = inject(MyService, { optional: true }) ?? new DefaultService();

// 4. Self injection (only look in current injector)
const service = inject(MyService, { self: true });

// 5. Skip self injection (only look in parent injectors)
const service = inject(MyService, { skipSelf: true });

// 6. Host injection (only look up to host component)
const service = inject(MyService, { host: true });

// 7. Cannot use inject() outside injection context
function helper() {
  // ❌ Error: inject() must be called from injection context
  const service = inject(MyService);
}

// ✅ Valid injection contexts:
// - Constructor
// - Property initializer (modern)
// - Factory provider
// - Route guard/resolver
// - Injection token factory
```

### 🟢 9.5 Provider Types

Angular supports several ways to provide dependencies:

#### 1. Class Providers

```typescript
// Most common - provide class instance
providers: [
  UserService, // Shortcut for: { provide: UserService, useClass: UserService }
  { provide: UserService, useClass: UserService },
];

// Provide different implementation
providers: [{ provide: LoggerService, useClass: ConsoleLoggerService }];
```

#### 2. Value Providers

```typescript
// Provide simple values
providers: [
  { provide: API_URL, useValue: "https://api.example.com" },
  { provide: MAX_RETRIES, useValue: 3 },
  { provide: FEATURE_FLAGS, useValue: { darkMode: true, analytics: false } },
];

// Usage
@Injectable()
export class ApiService {
  constructor(@Inject(API_URL) private apiUrl: string) {}
}
```

#### 3. Factory Providers

```typescript
// Create instance using factory function
providers: [
  {
    provide: UserService,
    useFactory: (http: HttpClient, config: AppConfig) => {
      // Factory can have dependencies
      return new UserService(http, config.apiUrl);
    },
    deps: [HttpClient, APP_CONFIG], // Factory dependencies
  },

  // Dynamic factory based on conditions
  {
    provide: LoggerService,
    useFactory: () => {
      return environment.production
        ? new ProductionLogger()
        : new DevelopmentLogger();
    },
  },
];

// Modern functional factory (Angular 14+)
function userServiceFactory() {
  const http = inject(HttpClient);
  const config = inject(APP_CONFIG);
  return new UserService(http, config.apiUrl);
}

providers: [{ provide: UserService, useFactory: userServiceFactory }];
```

#### 4. Existing Providers (Alias)

```typescript
// Alias one token to another
providers: [
  LoggerService,
  { provide: 'Logger', useExisting: LoggerService }  // Alias

  // Feature flag example
  { provide: 'ANALYTICS_ENABLED', useValue: true },
  { provide: AnalyticsService, useClass: environment.analyticsEnabled
    ? RealAnalyticsService
    : MockAnalyticsService
  }
]

// Usage
constructor(
  @Inject('Logger') private logger: LoggerService,
  @Inject('ANALYTICS_ENABLED') private analyticsEnabled: boolean
) {}
```

#### 5. Multi Providers

```typescript
// Multiple values for same token
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: 'PLUGINS', useValue: PluginA, multi: true },
  { provide: 'PLUGINS', useValue: PluginB, multi: true }
]

// Injected as array
constructor(@Inject(HTTP_INTERCEPTORS) private interceptors: HttpInterceptor[]) {
  console.log('All interceptors:', interceptors); // [AuthInterceptor, LoggingInterceptor, ErrorInterceptor]
}
```

### 🟢 9.6 InjectionToken

InjectionToken provides type-safe injection for values that aren't classes.

```typescript
import { InjectionToken } from '@angular/core';

// Create injection tokens
export const API_URL = new InjectionToken<string>('API URL');
export const APP_CONFIG = new InjectionToken<AppConfig>('Application configuration');
export const FEATURE_FLAGS = new InjectionToken<FeatureFlags>('Feature flags');

// Provide tokens
providers: [
  { provide: API_URL, useValue: 'https://api.example.com' },
  { provide: APP_CONFIG, useValue: { apiUrl: 'https://api.example.com', timeout: 5000 } },

  // Factory with InjectionToken
  {
    provide: API_CONFIG,
    useFactory: () => {
      const config = inject(APP_CONFIG);
      return {
        baseUrl: config.apiUrl,
        retries: config.maxRetries || 3
      };
    }
  }
]

// Inject tokens
constructor(
  @Inject(API_URL) private apiUrl: string,
  @Inject(APP_CONFIG) private config: AppConfig,
  @Inject(FEATURE_FLAGS) private flags: FeatureFlags
) {}

// Modern with inject()
private apiUrl = inject(API_URL);
private config = inject(APP_CONFIG);
```

### 🟢 9.7 providedIn Property

The `providedIn` property is the modern way to provide services.

```typescript
// 1. Root scope (singleton across application)
@Injectable({ providedIn: "root" })
export class UserService {}

// 2. Platform scope (shared across multiple apps)
@Injectable({ providedIn: "platform" })
export class PlatformService {}

// 3. Any scope (registered in specific injector)
@Injectable({ providedIn: "any" })
export class LazyService {} // Creates new instance in each lazy-loaded module

// 4. Specific module
@Injectable({ providedIn: UserModule })
export class UserService {} // Available only in UserModule

// 5. Environment scope (app or platform level)
@Injectable({ providedIn: "environment" })
export class EnvironmentService {}
```

**providedIn Benefits:**

- ✅ **Tree-shakable**: Service removed from bundle if not used
- ✅ **Simpler**: No need to add to providers array
- ✅ **Type-safe**: Only can provide to valid scopes
- ✅ **Lazy-loading**: Services in lazy modules load with module

### 🟢 9.8 DI Hierarchy Resolution

#### How Angular Resolves Dependencies

```
Component → Element Injector
    ↓
Module/Environment Injector
    ↓
Root Injector
    ↓
Platform Injector
    ↓
Null Injector (throw error)
```

#### Resolution Modifiers

```typescript
@Component({
  selector: "app-user",
  providers: [{ provide: UserService, useClass: LocalUserService }],
})
export class UserComponent {
  constructor(
    // 1. @Self() - only look in current injector
    @Self() private localService: UserService, // Gets LocalUserService

    // 2. @SkipSelf() - skip current, look in parent injectors
    @SkipSelf() private parentService: UserService, // Gets parent's UserService

    // 3. @Optional() - don't throw error if not found
    @Optional() private optionalService?: LoggerService,

    // 4. @Host() - look up to host component (not parent)
    @Host() private hostService: FormControl,

    // 5. @Inject() with injection token
    @Inject(API_URL) private apiUrl: string,
  ) {}
}
```

#### Resolution Example

```typescript
// Root level
@Injectable({ providedIn: "root" })
export class UserService {}

// Module level
@NgModule({
  providers: [{ provide: UserService, useClass: MockUserService }],
})
export class FeatureModule {}

// Component level
@Component({
  selector: "app-user",
  providers: [{ provide: UserService, useClass: LocalUserService }],
})
export class UserComponent {
  constructor(
    @Self() private localService: UserService, // LocalUserService
    @SkipSelf() private parentService: UserService, // MockUserService (from module)
    @Optional() @Host() private hostService?: any, // null (no host provider)
  ) {}
}
```

### 🟢 9.9 Service Lifetimes

Angular manages different service lifetimes:

#### 1. Singleton (Root Scope)

```typescript
@Injectable({ providedIn: "root" })
export class SingletonService {
  instanceId = Math.random();

  constructor() {
    console.log("SingletonService created", this.instanceId);
  }
}

// All components get same instance
@Component({})
export class CompA {}
@Component({})
export class CompB {}
// Both get same SingletonService instance
```

#### 2. Component-Scoped

```typescript
@Component({
  selector: 'app-user',
  providers: [ScopedService]  // Component-scoped
})
export class UserComponent {
  constructor(private service: ScopedService) {}
}

// Each UserComponent instance gets its own ScopedService
<app-user />  // Service instance 1
<app-user />  // Service instance 2
```

#### 3. Module-Scoped (NgModule)

```typescript
@NgModule({
  providers: [ModuleScopedService],
})
export class FeatureModule {}

// All components in FeatureModule share same instance
// Different modules get different instances
```

#### 4. Lazy-Loaded Singleton

```typescript
@Injectable({ providedIn: "any" })
export class LazyService {
  constructor() {
    console.log("LazyService instance created");
  }
}

// Each lazy-loaded module gets its own instance
// Eager modules share instance
```

### 🟢 9.10 Circular Dependencies

```typescript
// ❌ PROBLEM: Circular dependency
@Injectable()
export class ServiceA {
  constructor(private serviceB: ServiceB) {}
}

@Injectable()
export class ServiceB {
  constructor(private serviceA: ServiceA) {} // Circular!
}

// ✅ SOLUTION 1: Use forwardRef()
import { forwardRef, Injectable } from "@angular/core";

@Injectable()
export class ServiceA {
  constructor(@Inject(forwardRef(() => ServiceB)) private serviceB: ServiceB) {}
}

@Injectable()
export class ServiceB {
  constructor(private serviceA: ServiceA) {}
}

// ✅ SOLUTION 2: Use inject() in method
@Injectable()
export class ServiceA {
  constructor() {}

  doSomething() {
    const serviceB = inject(ServiceB); // Inject when needed
    serviceB.method();
  }
}

// ✅ SOLUTION 3: Refactor design
// Move shared logic to third service
@Injectable()
export class CommonService {
  // Shared logic
}

@Injectable()
export class ServiceA {
  constructor(private common: CommonService) {}
}

@Injectable()
export class ServiceB {
  constructor(private common: CommonService) {}
}
```

### Key Takeaways: Dependency Injection

✅ **DI provides dependencies** rather than components creating them  
✅ **Constructor injection** is traditional, **inject()** is modern  
✅ **Injectors form hierarchy** (root → module → component)  
✅ **providedIn: 'root'** for singleton, tree-shakable services  
✅ **InjectionToken** for type-safe non-class dependencies  
✅ **Resolution modifiers** (@Self, @SkipSelf, @Optional, @Host)  
✅ **Factory providers** for complex initialization  
✅ **Multi providers** for arrays of services (like interceptors)

### Common DI Mistakes

❌ **Service not provided**

```typescript
@Injectable()
export class UserService {}

@Component({
  selector: 'app-user'
  // ❌ Missing providers: [UserService]
})
export class UserComponent {
  constructor(private service: UserService) {}  // Error: No provider!
}

// ✅ Solution
@Component({
  selector: 'app-user',
  providers: [UserService]  // Or use providedIn: 'root'
})
```

❌ **Multiple instances unintentionally**

```typescript
// Root and module both provide
@Injectable({ providedIn: "root" })
export class UserService {}

@NgModule({
  providers: [UserService], // ❌ Creates second instance!
})
export class UserModule {}
```

❌ **Injection token without @Inject**

```typescript
constructor(private API_URL: string) {}  // ❌ Won't work

constructor(@Inject(API_URL) private apiUrl: string) {}  // ✅ Correct
```

### Interview Questions: Dependency Injection

**Beginner:**

Q: What is Dependency Injection in Angular?  
A: DI is a design pattern where components receive dependencies from Angular's injector rather than creating them directly. This promotes decoupling, testability, and maintainability.

Q: What are the benefits of using Dependency Injection?  
A: 1) Decoupling components from dependencies, 2) Easier testing with mock services, 3) Centralized configuration, 4) Better code organization, 5) Singleton pattern for services.

**Intermediate:**

Q: What's the difference between constructor injection and using inject()?  
A: Constructor injection is the traditional approach where dependencies are declared in constructor parameters. inject() is functional injection available in Angular 14+ that can be used in property initializers and functions, providing more flexibility.

Q: How does Angular's injector hierarchy work?  
A: Angular has multiple injector levels: 1) Null injector (throws error), 2) Platform injector, 3) Root injector, 4) Module/Environment injector, 5) Element/Component injector. Angular searches from current injector upward.

Q: What does providedIn: 'root' do?  
A: It registers a service in the root injector, making it a singleton across the entire application. It's tree-shakable (removed from bundle if not used) and doesn't need to be added to providers arrays.

**Advanced:**

Q: How would you handle a circular dependency between two services?  
A: 1) Use forwardRef() to reference forward-declared class, 2) Use inject() to lazily inject when needed, 3) Refactor to remove circular dependency by extracting common logic to a third service, 4) Use setter injection instead of constructor.

Q: What's the difference between @Self, @SkipSelf, and @Host decorators?  
A: @Self restricts search to current injector. @SkipSelf skips current injector and searches parents. @Host restricts search up to the host component (useful for directives).

Q: How do factory providers work and when would you use them?  
A: Factory providers use a factory function to create instances. Use them when: 1) Complex initialization is needed, 2) Service depends on runtime values, 3) Different implementations based on conditions, 4) You need to configure a service before use.

---

## 10. Services

### 🟢 10.1 What are Services?

Services are reusable classes that contain business logic, data access, and other functionality shared across components.

#### Why Use Services?

```typescript
// ❌ BAD - Logic duplicated in components
@Component({})
export class ComponentA {
  getUsers() {
    return fetch("/api/users");
  }
}

@Component({})
export class ComponentB {
  getUsers() {
    return fetch("/api/users"); // Duplicated!
  }
}

// ✅ GOOD - Logic in shared service
@Injectable({ providedIn: "root" })
export class UserService {
  getUsers() {
    return this.http.get("/api/users");
  }
}

@Component({})
export class ComponentA {
  constructor(private userService: UserService) {}
}

@Component({})
export class ComponentB {
  constructor(private userService: UserService) {} // Reuse same service
}
```

### 🟢 10.2 Creating Services

#### Basic Service

```typescript
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root", // Makes it a singleton available app-wide
})
export class UserService {
  private users: User[] = [];

  constructor() {
    console.log("UserService created");
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  removeUser(id: number): void {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
```

#### Service with Dependencies

```typescript
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "https://api.example.com/users";

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    @Inject(API_CONFIG) private config: ApiConfig,
  ) {
    this.logger.log("UserService initialized");
  }

  // HTTP operations
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

### 🟢 10.3 Service Design Patterns

#### 1. Singleton Service

```typescript
@Injectable({ providedIn: "root" })
export class AuthService {
  private token: string | null = null;

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem("auth_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem("auth_token");
  }
}
```

#### 2. Factory Service

```typescript
@Injectable({ providedIn: "root" })
export class NotificationService {
  constructor(
    @Inject(NOTIFICATION_STRATEGY) private strategies: NotificationStrategy[],
  ) {}

  notify(message: string, type: "email" | "sms" | "push"): void {
    const strategy = this.strategies.find((s) => s.type === type);
    if (strategy) {
      strategy.send(message);
    }
  }
}
```

#### 3. Facade Service

```typescript
@Injectable({ providedIn: "root" })
export class ShoppingCartFacade {
  private items = signal<CartItem[]>([]);
  private total = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private paymentService: PaymentService,
  ) {}

  // Simplified interface for components
  addToCart(productId: number, quantity: number): void {
    this.cartService.addItem(productId, quantity);
    this.items.set(this.cartService.getItems());
  }

  checkout(): Observable<boolean> {
    return this.paymentService.process(this.items());
  }

  getTotal(): number {
    return this.total();
  }
}
```

#### 4. State Management Service

```typescript
@Injectable({ providedIn: "root" })
export class UserStateService {
  // Signals for reactive state
  private users = signal<User[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);

  // Public readonly signals
  readonly users$ = this.users.asReadonly();
  readonly loading$ = this.loading.asReadonly();
  readonly error$ = this.error.asReadonly();

  constructor(private userService: UserService) {}

  loadUsers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }

  addUser(user: User): void {
    this.userService.createUser(user).subscribe((newUser) => {
      this.users.update((users) => [...users, newUser]);
    });
  }

  updateUser(user: User): void {
    this.userService.updateUser(user.id, user).subscribe((updated) => {
      this.users.update((users) =>
        users.map((u) => (u.id === updated.id ? updated : u)),
      );
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users.update((users) => users.filter((u) => u.id !== id));
    });
  }
}
```

#### 5. Smart vs Dumb Components with Services

```typescript
// SMART component (container) - knows about services
@Component({
  selector: "app-user-list",
  standalone: true,
  imports: [UserCardComponent],
  template: `
    <div *ngIf="loading()">Loading...</div>
    <div *ngIf="error()">{{ error() }}</div>

    <div *ngFor="let user of users()">
      <app-user-card [user]="user"></app-user-card>
    </div>

    <button (click)="loadUsers()">Refresh</button>
  `,
})
export class UserListComponent {
  // Uses state service
  private userState = inject(UserStateService);

  users = this.userState.users$;
  loading = this.userState.loading$;
  error = this.userState.error$;

  loadUsers() {
    this.userState.loadUsers();
  }

  ngOnInit() {
    this.loadUsers();
  }
}

// DUMB component (presentational) - only knows about inputs/outputs
@Component({
  selector: "app-user-card",
  standalone: true,
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
      <button (click)="delete.emit(user.id)">Delete</button>
    </div>
  `,
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() delete = new EventEmitter<number>();
}
```

### 🟢 10.4 Service Communication Patterns

#### 1. Shared Service (Singleton Communication)

```typescript
@Injectable({ providedIn: "root" })
export class MessageService {
  private messages = new Subject<string>();
  messages$ = this.messages.asObservable();

  sendMessage(message: string): void {
    this.messages.next(message);
  }
}

// Component A
@Component({})
export class ComponentA {
  constructor(private messageService: MessageService) {}

  send(): void {
    this.messageService.sendMessage("Hello from A!");
  }
}

// Component B
@Component({})
export class ComponentB {
  messages: string[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.messages$.subscribe((msg) => {
      this.messages.push(msg);
    });
  }
}
```

#### 2. Service with Subjects

```typescript
@Injectable({ providedIn: "root" })
export class UserDataService {
  // BehaviorSubject stores current value
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  // Action stream
  private loadUsersSubject = new Subject<void>();
  loadUsers$ = this.loadUsersSubject.asObservable();

  loadUsers(): void {
    this.loadUsersSubject.next();
  }

  updateUsers(users: User[]): void {
    this.usersSubject.next(users);
  }

  addUser(user: User): void {
    const current = this.usersSubject.value;
    this.usersSubject.next([...current, user]);
  }
}
```

### 🟢 10.5 Avoiding "God Services"

**God Service Anti-pattern**: A service that does everything!

```typescript
// ❌ BAD - God service doing everything
@Injectable({ providedIn: "root" })
export class GodService {
  // User management
  getUsers() {
    /* ... */
  }
  updateUser() {
    /* ... */
  }
  deleteUser() {
    /* ... */
  }

  // Product management
  getProducts() {
    /* ... */
  }
  updateProduct() {
    /* ... */
  }

  // Order management
  getOrders() {
    /* ... */
  }
  processOrder() {
    /* ... */
  }

  // Authentication
  login() {
    /* ... */
  }
  logout() {
    /* ... */
  }

  // Configuration
  getConfig() {
    /* ... */
  }
  // ... and more!
}
```

**✅ GOOD - Single Responsibility Principle**

```typescript
// Separate services by responsibility
@Injectable({ providedIn: "root" })
export class UserService {
  getUsers() {
    /* ... */
  }
  updateUser() {
    /* ... */
  }
}

@Injectable({ providedIn: "root" })
export class ProductService {
  getProducts() {
    /* ... */
  }
  updateProduct() {
    /* ... */
  }
}

@Injectable({ providedIn: "root" })
export class OrderService {
  getOrders() {
    /* ... */
  }
  processOrder() {
    /* ... */
  }
}

@Injectable({ providedIn: "root" })
export class AuthService {
  login() {
    /* ... */
  }
  logout() {
    /* ... */
  }
}

// Facade for complex operations
@Injectable({ providedIn: "root" })
export class ShoppingService {
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  buyProduct(productId: number) {
    const product = this.productService.getProduct(productId);
    return this.orderService.createOrder(product);
  }
}
```

### 🟢 10.6 Service Testing

#### Unit Testing Services

```typescript
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it("should fetch users", () => {
    const mockUsers = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];

    // Make request
    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    // Expect request and respond with mock data
    const req = httpMock.expectOne("/api/users");
    expect(req.request.method).toBe("GET");
    req.flush(mockUsers);
  });

  it("should handle errors", () => {
    const errorMessage = "Server error";

    service.getUsers().subscribe({
      next: () => fail("should have failed"),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.message).toBe(errorMessage);
      },
    });

    const req = httpMock.expectOne("/api/users");
    req.flush(errorMessage, {
      status: 500,
      statusText: "Server Error",
    });
  });
});
```

#### Testing Service with Dependencies

```typescript
import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { LoggerService } from "./logger.service";

// Mock logger
class MockLoggerService {
  log = jasmine.createSpy("log");
  error = jasmine.createSpy("error");
}

describe("UserService with dependencies", () => {
  let service: UserService;
  let logger: MockLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: LoggerService, useClass: MockLoggerService },
      ],
    });

    service = TestBed.inject(UserService);
    logger = TestBed.inject(LoggerService) as unknown as MockLoggerService;
  });

  it("should log when getting users", () => {
    // Test that logger is called
    expect(logger.log).toHaveBeenCalledWith("UserService initialized");
  });
});
```

### Key Takeaways: Services

✅ **Services contain business logic** and data access  
✅ **Singleton services** with `providedIn: 'root'`  
✅ **Smart/Dumb component pattern** separates concerns  
✅ **Facade services** simplify complex operations  
✅ **State management services** with Signals/RxJS  
✅ **Avoid God services** - follow Single Responsibility Principle  
✅ **Services are easily testable** with dependency injection  
✅ **Shared services enable** component communication

### Common Service Mistakes

❌ **Logic in components instead of services**

```typescript
// BAD - HTTP call in component
@Component({})
export class UserComponent {
  users: User[] = [];

  ngOnInit() {
    fetch("/api/users") // ❌ HTTP logic in component
      .then((response) => response.json())
      .then((users) => (this.users = users));
  }
}

// GOOD - Service handles HTTP
@Component({})
export class UserComponent {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users; // ✅ Component only handles display
    });
  }
}
```

❌ **Not handling errors in services**

```typescript
// BAD - No error handling
getUsers() {
  return this.http.get('/api/users');
}

// GOOD - Proper error handling
getUsers() {
  return this.http.get('/api/users').pipe(
    catchError(error => {
      this.logger.error('Failed to fetch users', error);
      return throwError(() => new Error('Could not load users'));
    })
  );
}
```

❌ **Not unsubscribing from observables**

```typescript
// BAD - Memory leak
ngOnInit() {
  this.userService.getUsers().subscribe(users => {
    this.users = users;
  });
}

// GOOD - Clean up subscription
ngOnInit() {
  this.userService.getUsers()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(users => {
      this.users = users;
    });
}
```

---

### Interview Questions: Services

**Beginner:**

Q: What is a service in Angular?  
A: A service is a class with a specific purpose that provides functionality across components. Services typically contain business logic, data access, or utility functions. They're decorated with @Injectable and can be injected into components via DI.

Q: How do you create a service?  
A: Create a class with @Injectable({ providedIn: 'root' }) decorator. This makes it a singleton available throughout the app. Use `ng generate service <name>` CLI command to scaffold.

**Intermediate:**

Q: What's the difference between providing a service at root vs component level?  
A: Root-level (providedIn: 'root') creates a singleton shared across the app. Component-level creates a new instance for each component instance. Root is tree-shakable and more common.

Q: How do components communicate through services?  
A: Services can use Subjects/BehaviorSubjects to emit events that components subscribe to. One component calls service method to emit, other components subscribe to the observable.

Q: What is the Smart/Dumb component pattern?  
A: Smart (container) components interact with services and manage state. Dumb (presentational) components receive data via @Input and emit events via @Output. This separation improves testability and reusability.

**Advanced:**

Q: How would you design a state management service with Signals?  
A: Use writable signals for private state, computed signals for derived values, and readonly signals for public access. Provide methods to update state immutably. Use effects for side effects when state changes.

Q: What's the Facade pattern and when would you use it in Angular?  
A: A Facade service provides a simplified interface to a complex subsystem of services. Use it when: 1) Multiple services work together, 2) Components don't need to know implementation details, 3) You want to centralize complex operations.

Q: How do you handle service errors and retry logic?  
A: Use RxJS operators like catchError for error handling, retry/retryWhen for automatic retries, and throwError to propagate errors. Implement exponential backoff for API retries. Log errors appropriately.

---

## 11. Directives

### 🟢 11.1 What are Directives?

Directives are classes that add behavior to elements in Angular templates. There are three types:

1. **Component Directives** (components are directives with templates)
2. **Structural Directives** (change DOM structure: *ngIf, *ngFor)
3. **Attribute Directives** (change appearance/behavior: ngClass, ngStyle)

### 🟢 11.2 Attribute Directives

Attribute directives change the appearance or behavior of an element.

#### Built-in Attribute Directives

```typescript
@Component({
  selector: "app-example",
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- ngClass - conditional classes -->
    <div [ngClass]="{ active: isActive, error: hasError }">Dynamic classes</div>

    <!-- ngStyle - dynamic styles -->
    <div
      [ngStyle]="{
        color: textColor,
        'font-size.px': fontSize,
        'background-color': bgColor,
      }"
    >
      Dynamic styles
    </div>

    <!-- ngModel - two-way binding -->
    <input [(ngModel)]="userName" placeholder="Name" />
    <p>Hello, {{ userName }}</p>
  `,
})
export class ExampleComponent {
  isActive = true;
  hasError = false;
  textColor = "blue";
  fontSize = 16;
  bgColor = "#f0f0f0";
  userName = "";
}
```

#### Creating Custom Attribute Directives

```typescript
import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight = "yellow"; // Default highlight color
  @Input() defaultColor = "transparent";

  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = this.defaultColor;
  }

  @HostListener("mouseenter")
  onMouseEnter() {
    this.highlight(this.appHighlight);
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.highlight(this.defaultColor);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

// Usage
@Component({
  imports: [HighlightDirective],
  template: `
    <p appHighlight>Hover me! (default yellow)</p>
    <p appHighlight="lightblue">Hover me! (custom color)</p>
    <p [appHighlight]="'pink'" [defaultColor]="'lightgray'">
      Hover me! (with default color)
    </p>
  `,
})
export class ExampleComponent {}
```

#### Renderer2 for DOM Manipulation

```typescript
import { Directive, ElementRef, Renderer2, OnInit } from "@angular/core";

@Directive({
  selector: "[appBorder]",
  standalone: true,
})
export class BorderDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngOnInit() {
    // ✅ Use Renderer2 for safe DOM manipulation
    this.renderer.setStyle(this.el.nativeElement, "border", "2px solid blue");
    this.renderer.addClass(this.el.nativeElement, "bordered");
    this.renderer.setAttribute(this.el.nativeElement, "data-bordered", "true");

    // ❌ Avoid direct DOM manipulation
    // this.el.nativeElement.style.border = '2px solid blue';
  }
}
```

**Why use Renderer2?**

- ✅ Platform-agnostic (works with server-side rendering)
- ✅ Safer (prevents XSS vulnerabilities)
- ✅ Better for web workers
- ✅ Recommended by Angular team

#### HostBinding and HostListener

```typescript
import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.open')
  isOpen = false;

  @HostBinding('attr.aria-expanded')
  get ariaExpanded() {
    return this.isOpen.toString();
  }

  @HostListener('click')
  toggle() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    // Close when clicking outside
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

  constructor(private el: ElementRef) {}
}

// Usage
<div appDropdown class="dropdown">
  <button>Toggle Dropdown</button>
  <ul class="dropdown-menu">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>
```

### 🟢 11.3 Structural Directives

Structural directives change the DOM structure by adding or removing elements.

#### Creating Custom Structural Directives

```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

// Custom *appUnless directive (opposite of *ngIf)
@Directive({
  selector: '[appUnless]',
  standalone: true
})
export class UnlessDirective {
  private hasView = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appUnless(condition: boolean) {
    if (!condition && !this.hasView) {
      // Create view if condition is false
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      // Remove view if condition is true
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}

// Usage
<p *appUnless="isHidden">Show this when NOT hidden</p>

// Desugared form
<ng-template [appUnless]="isHidden">
  <p>Show this when NOT hidden</p>
</ng-template>
```

#### Advanced Structural Directive with Context

```typescript
@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set appRepeat(times: number) {
    this.viewContainer.clear();

    for (let i = 0; i < times; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: i,     // Default variable
        index: i,         // Named variable
        even: i % 2 === 0,
        odd: i % 2 !== 0
      });
    }
  }
}

// Usage
<div *appRepeat="5; let i; let isEven = even">
  Item {{ i }} - {{ isEven ? 'Even' : 'Odd' }}
</div>
```

### 🟢 11.4 Host Directives (Angular 15+)

Host directives allow directives to compose functionality from other directives.

```typescript
// Base tooltip directive
@Directive({
  selector: '[appTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input() tooltip = '';

  @HostListener('mouseenter')
  show() {
    console.log('Showing tooltip:', this.tooltip);
  }

  @HostListener('mouseleave')
  hide() {
    console.log('Hiding tooltip');
  }
}

// Component that uses host directive
@Component({
  selector: 'app-button',
  standalone: true,
  hostDirectives: [
    {
      directive: TooltipDirective,
      inputs: ['tooltip']  // Expose tooltip input
    }
  ],
  template: `<button><ng-content></ng-content></button>`
})
export class ButtonComponent {}

// Usage - tooltip functionality automatically available
<app-button tooltip="Click me!">Submit</app-button>
```

### 🟢 11.5 Directive Composition

```typescript
// Multiple host directives
@Component({
  selector: "app-card",
  standalone: true,
  hostDirectives: [
    TooltipDirective,
    HighlightDirective,
    ClickTrackingDirective,
  ],
  template: `<div class="card"><ng-content></ng-content></div>`,
})
export class CardComponent {}
```

### Key Takeaways: Directives

✅ **Attribute directives change appearance/behavior** without changing DOM structure  
✅ **Structural directives change DOM structure** by adding/removing elements  
✅ **Use Renderer2** for safe DOM manipulation  
✅ **HostBinding binds to host element properties**  
✅ **HostListener listens to host element events**  
✅ **Custom directives extend Angular functionality**  
✅ **Host directives enable composition** (Angular 15+)  
✅ **TemplateRef and ViewContainerRef** for structural directives

### Interview Questions: Directives

**Beginner:**

Q: What are the three types of directives in Angular?  
A: 1) Component directives (components with templates), 2) Structural directives (change DOM structure like *ngIf, *ngFor), 3) Attribute directives (change appearance/behavior like ngClass, ngStyle).

Q: What's the difference between structural and attribute directives?  
A: Structural directives add/remove DOM elements (use \* syntax), while attribute directives modify existing elements' properties or behavior without changing DOM structure.

**Intermediate:**

Q: What are HostBinding and HostListener used for?  
A: HostBinding binds directive properties to host element properties/attributes. HostListener listens to host element events. Both allow directives to interact with their host element without direct DOM manipulation.

Q: Why should you use Renderer2 instead of direct DOM manipulation?  
A: Renderer2 is platform-agnostic (works with server-side rendering), safer against XSS attacks, compatible with web workers, and is the recommended Angular approach for DOM manipulation.

Q: How do you create a custom structural directive?  
A: Inject TemplateRef (template content) and ViewContainerRef (container to render template). Use ViewContainerRef.createEmbeddedView() to show template and ViewContainerRef.clear() to hide it.

**Advanced:**

Q: What are host directives and when would you use them?  
A: Host directives (Angular 15+) allow components to inherit functionality from other directives through composition. Use them to add common behaviors (tooltips, tracking, styling) to components without inheritance.

Q: How does Angular desugar structural directive syntax?  
A: `<div *ngIf="condition">` is desugared to `<ng-template [ngIf]="condition"><div></div></ng-template>`. The \* syntax is syntactic sugar for the ng-template form.

---

## 12. Pipes

### 🟢 12.1 What are Pipes?

Pipes transform data in templates. They take input, process it, and return transformed output.

```typescript
// Syntax: {{ value | pipeName:arg1:arg2 }}

@Component({
  template: `
    <p>{{ 'hello' | uppercase }}</p>  <!-- HELLO -->
    <p>{{ today | date:'short' }}</p>  <!-- 1/15/24, 3:30 PM -->
    <p>{{ price | currency:'USD' }}</p>  <!-- $99.99 -->
  `
})
```

### 🟢 12.2 Built-in Pipes

```typescript
@Component({
  selector: "app-pipes-demo",
  standalone: true,
  imports: [CommonModule, DatePipe, CurrencyPipe],
  template: `
    <!-- String pipes -->
    <p>{{ "hello world" | uppercase }}</p>
    <!-- HELLO WORLD -->
    <p>{{ "HELLO WORLD" | lowercase }}</p>
    <!-- hello world -->
    <p>{{ "hello world" | titlecase }}</p>
    <!-- Hello World -->

    <!-- Number pipes -->
    <p>{{ 123456.789 | number }}</p>
    <!-- 123,456.789 -->
    <p>{{ 123456.789 | number: "1.0-0" }}</p>
    <!-- 123,457 -->
    <p>{{ 123456.789 | number: "3.2-2" }}</p>
    <!-- 123,456.79 -->

    <!-- Currency pipe -->
    <p>{{ 99.99 | currency }}</p>
    <!-- $99.99 -->
    <p>{{ 99.99 | currency: "EUR" }}</p>
    <!-- €99.99 -->
    <p>{{ 99.99 | currency: "INR" : "symbol" : "1.0-0" }}</p>
    <!-- ₹100 -->

    <!-- Date pipe -->
    <p>{{ today | date }}</p>
    <!-- Jan 15, 2024 -->
    <p>{{ today | date: "short" }}</p>
    <!-- 1/15/24, 3:30 PM -->
    <p>{{ today | date: "fullDate" }}</p>
    <!-- Monday, January 15, 2024 -->
    <p>{{ today | date: "yyyy-MM-dd" }}</p>
    <!-- 2024-01-15 -->

    <!-- Percent pipe -->
    <p>{{ 0.259 | percent }}</p>
    <!-- 26% -->
    <p>{{ 0.259 | percent: "2.2-2" }}</p>
    <!-- 25.90% -->

    <!-- JSON pipe (for debugging) -->
    <pre>{{ user | json }}</pre>

    <!-- Slice pipe -->
    <p>{{ [1, 2, 3, 4, 5] | slice: 1 : 3 }}</p>
    <!-- [2, 3] -->
    <p>{{ "Hello World" | slice: 0 : 5 }}</p>
    <!-- Hello -->

    <!-- KeyValue pipe (for objects) -->
    <div *ngFor="let item of object | keyvalue">
      {{ item.key }}: {{ item.value }}
    </div>
  `,
})
export class PipesDemoComponent {
  today = new Date();
  price = 99.99;
  user = { name: "John", age: 30 };
  object = { a: 1, b: 2, c: 3 };
}
```

### 🟢 12.3 Creating Custom Pipes

#### Basic Custom Pipe

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential',
  standalone: true
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exponent: number = 1): number {
    return Math.pow(value, exponent);
  }
}

// Usage
<p>{{ 2 | exponential:10 }}</p>  <!-- 1024 -->
<p>{{ 3 | exponential:3 }}</p>  <!-- 27 -->
```

#### Pipe with Multiple Arguments

```typescript
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 20, ellipsis: string = '...'): string {
    if (!value) return '';
    if (value.length <= limit) return value;
    return value.substring(0, limit) + ellipsis;
  }
}

// Usage
<p>{{ longText | truncate:50 }}</p>
<p>{{ longText | truncate:30:'…' }}</p>
```

#### Practical Custom Pipes

```typescript
// 1. Filter pipe
@Pipe({
  name: 'filter',
  standalone: true,
  pure: false  // Impure pipe (use with caution!)
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, property: string): any[] {
    if (!items || !searchText) return items;

    return items.filter(item =>
      item[property].toLowerCase().includes(searchText.toLowerCase())
    );
  }
}

// Usage
<div *ngFor="let user of users | filter:searchTerm:'name'">
  {{ user.name }}
</div>

// 2. Sort pipe
@Pipe({
  name: 'sort',
  standalone: true,
  pure: false
})
export class SortPipe implements PipeTransform {
  transform(array: any[], field: string, order: 'asc' | 'desc' = 'asc'): any[] {
    if (!array || !field) return array;

    const sorted = [...array].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }
}

// Usage
<div *ngFor="let user of users | sort:'name':'asc'">
  {{ user.name }}
</div>

// 3. Time ago pipe
@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)} days ago`;
    return `${Math.floor(seconds / 2592000)} months ago`;
  }
}

// Usage
<p>Posted {{ post.createdAt | timeAgo }}</p>
<!-- Posted 5 minutes ago -->

// 4. Safe HTML pipe
@Pipe({
  name: 'safeHtml',
  standalone: true
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}

// Usage
<div [innerHTML]="htmlContent | safeHtml"></div>
```

### 🟢 12.4 Pure vs Impure Pipes

#### Pure Pipes (Default)

```typescript
@Pipe({
  name: "pureExample",
  standalone: true,
  pure: true, // Default
})
export class PureExamplePipe implements PipeTransform {
  transform(value: string): string {
    console.log("Pure pipe called");
    return value.toUpperCase();
  }
}

// Pure pipe only runs when:
// - Primitive input changes (string, number, boolean)
// - Object/array reference changes
```

**Pure Pipe Behavior:**

```typescript
@Component({
  template: `
    <p>{{ name | pureExample }}</p>
    <!-- Only runs when 'name' reference changes -->
    <button (click)="changeName()">Change</button>
  `,
})
export class ExampleComponent {
  name = "john";

  changeName() {
    this.name = "jane"; // New primitive value - pipe runs
  }
}
```

#### Impure Pipes

```typescript
@Pipe({
  name: "impureExample",
  standalone: true,
  pure: false, // Impure
})
export class ImpureExamplePipe implements PipeTransform {
  transform(value: string): string {
    console.log("Impure pipe called");
    return value.toUpperCase();
  }
}

// Impure pipe runs on EVERY change detection cycle
// Use with caution - performance impact!
```

**Impure Pipe Behavior:**

```typescript
@Component({
  template: `
    <input [(ngModel)]="searchTerm" />
    <!-- Impure pipe runs on EVERY keystroke -->
    <div *ngFor="let user of users | filterImpure: searchTerm">
      {{ user.name }}
    </div>
  `,
})
export class ExampleComponent {
  users = [{ name: "John" }, { name: "Jane" }, { name: "Bob" }];
  searchTerm = "";
}
```

**Pure vs Impure Comparison:**

| Aspect            | Pure Pipe               | Impure Pipe               |
| ----------------- | ----------------------- | ------------------------- |
| **Performance**   | ✅ Efficient            | ❌ Can be slow            |
| **When runs**     | Input reference changes | Every change detection    |
| **Use for**       | Simple transforms       | Filtering, sorting arrays |
| **Default**       | Yes                     | No (must set pure: false) |
| **Best practice** | Preferred               | Use sparingly             |

**⚠️ Warning: Impure pipes can cause performance issues!**

### 🟢 12.5 AsyncPipe

The AsyncPipe subscribes to Observables/Promises and unwraps their values.

```typescript
import { Component } from "@angular/core";
import { Observable, interval } from "rxjs";
import { map } from "rxjs/operators";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-async-demo",
  standalone: true,
  imports: [AsyncPipe],
  template: `
    <!-- Without AsyncPipe - manual subscription -->
    <p>Time: {{ time }}</p>

    <!-- With AsyncPipe - automatic subscription -->
    <p>Time: {{ time$ | async }}</p>

    <!-- AsyncPipe with user data -->
    <div *ngIf="user$ | async as user; else loading">
      <h2>{{ user.name }}</h2>
      <p>{{ user.email }}</p>
    </div>

    <ng-template #loading>
      <p>Loading user...</p>
    </ng-template>

    <!-- Multiple async pipes to same observable -->
    <p>{{ data$ | async }}</p>
    <p>{{ data$ | async }}</p>
    <!-- ❌ Creates second subscription! -->

    <!-- Better: Use 'as' to share value -->
    <div *ngIf="data$ | async as data">
      <p>{{ data }}</p>
      <p>{{ data }}</p>
      <!-- ✅ No second subscription -->
    </div>
  `,
})
export class AsyncDemoComponent implements OnInit {
  time = "";
  time$!: Observable<string>;
  user$!: Observable<User>;
  data$!: Observable<any>;

  ngOnInit() {
    // Manual subscription (need cleanup)
    interval(1000).subscribe((val) => {
      this.time = new Date().toLocaleTimeString();
    });

    // Observable (AsyncPipe handles subscription)
    this.time$ = interval(1000).pipe(
      map(() => new Date().toLocaleTimeString()),
    );

    this.user$ = this.userService.getUser();
  }
}
```

**AsyncPipe Benefits:**

- ✅ **Automatic subscription** management
- ✅ **Automatic unsubscription** on destroy
- ✅ **OnPush friendly** - marks for check when value arrives
- ✅ **No memory leaks** from forgotten unsubscribes

**AsyncPipe Internals:**

```typescript
// What AsyncPipe does internally:
export class AsyncPipe implements OnDestroy {
  private subscription: Subscription;
  private value: any;

  transform(observable: Observable<any>): any {
    if (!this.subscription) {
      this.subscription = observable.subscribe((value) => {
        this.value = value;
        this.cdr.markForCheck(); // Trigger change detection
      });
    }
    return this.value;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe(); // Automatic cleanup
  }
}
```

### Key Takeaways: Pipes

✅ **Pipes transform data in templates**  
✅ **Pure pipes are efficient** (default, recommended)  
✅ **Impure pipes run every change detection** (use sparingly)  
✅ **AsyncPipe manages subscriptions** automatically  
✅ **Custom pipes for reusable transformations**  
✅ **Chain multiple pipes** with | separator  
✅ **Pipes are testable** and reusable

## 13. RxJS in Angular\*\*

### 🟢 13.1 What is RxJS?

RxJS (Reactive Extensions for JavaScript) is a library for working with **asynchronous and event-based data using Observables**.

Angular uses RxJS extensively for:

- HTTP requests
- Reactive forms
- Router events
- User events
- Application state
- WebSocket streams
- Asynchronous operations
- Combining multiple asynchronous data sources

The core idea is to represent data as a **stream over time**.

```typescript
// Traditional approach
const user = getUser();

// RxJS approach
const user$ = getUser();
```

The `$` suffix is a common Angular/RxJS naming convention indicating that a variable contains an Observable.

```typescript
users$: Observable<User[]>;
user$: Observable<User>;
isLoading$: Observable<boolean>;
```

A stream can be visualized as:

```text
Observable
    |
    +----> Value 1
    |
    +----> Value 2
    |
    +----> Value 3
    |
    +----> Complete
```

An Observable can emit:

- Zero or more values
- An error
- A completion notification

**Important:** An Observable is not the same as the values it will eventually produce. It represents the **stream/execution that can produce those values**.

---

### 🟢 13.2 Observable

An `Observable` represents a stream of values that can be observed over time.

```typescript
import { Observable } from "rxjs";

const numbers$ = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
```

Subscribe to it:

```typescript
numbers$.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log("Completed"),
});
```

Output:

```text
1
2
3
Completed
```

An Observable has three types of notifications:

```text
next(value)
    ↓
    Emits a value

error(error)
    ↓
    Terminates with an error

complete()
    ↓
    Successfully terminates
```

Once an Observable emits an error or completes, it cannot emit additional values.

---

### 🟢 13.3 Observer

An Observer defines how we respond to an Observable's notifications.

```typescript
observable.subscribe({
  next: (value) => {
    console.log("Value:", value);
  },

  error: (error) => {
    console.error("Error:", error);
  },

  complete: () => {
    console.log("Completed");
  },
});
```

You can also provide only the `next` callback:

```typescript
observable.subscribe((value) => {
  console.log(value);
});
```

**Interview Point:**

An `Observable` produces notifications, while an `Observer` consumes those notifications.

---

### 🟢 13.4 Subscription

A `Subscription` represents the execution of an Observable and provides a way to stop it.

```typescript
const subscription = observable.subscribe((value) => {
  console.log(value);
});

// Cancel the subscription
subscription.unsubscribe();
```

For example:

```typescript
import { interval } from "rxjs";

const subscription = interval(1000).subscribe((value) => {
  console.log(value);
});

// Stop receiving values
setTimeout(() => {
  subscription.unsubscribe();
}, 5000);
```

Without unsubscribing from long-lived streams, subscriptions can continue after a component is destroyed and potentially cause memory leaks or unwanted behavior.

In modern Angular, prefer:

```typescript
takeUntilDestroyed();
```

or:

```typescript
AsyncPipe;
```

where appropriate.

---

### 🟢 13.5 Observable vs Promise

| Feature              | Observable                    | Promise                      |
| -------------------- | ----------------------------- | ---------------------------- |
| Values               | Multiple values               | One value                    |
| Lazy execution       | Usually yes                   | No                           |
| Cancellation         | `unsubscribe()`               | Not natively cancellable     |
| Operators            | Large RxJS operator ecosystem | `.then()`, `.catch()`, etc.  |
| Streams              | Yes                           | No                           |
| Can complete         | Yes                           | Resolves/rejects             |
| Angular HTTP         | Yes                           | Can be converted             |
| Multiple subscribers | Supported                     | Promise result can be shared |

Example:

```typescript
// Promise
const userPromise = fetch("/api/user").then((response) => response.json());

// Observable
const user$ = this.http.get<User>("/api/user");
```

**Interview Question:**

**Why does Angular's HttpClient return Observables instead of Promises?**

Because Observables provide:

- Cancellation through unsubscription
- Powerful composition using RxJS operators
- Consistent handling of asynchronous streams
- Integration with Angular's reactive APIs
- Support for multiple emissions when the underlying source supports them

---

### 🟢 13.6 Cold vs Hot Observables

### Cold Observable

A cold Observable creates its execution separately for each subscriber.

```typescript
const observable$ = new Observable((subscriber) => {
  console.log("Execution started");

  subscriber.next(Math.random());
});
```

```typescript
observable$.subscribe((value) => console.log("A:", value));
observable$.subscribe((value) => console.log("B:", value));
```

The Observable execution happens separately for each subscription.

```text
Subscriber A
      ↓
  Execution A

Subscriber B
      ↓
  Execution B
```

Angular HTTP Observables are commonly cold.

```typescript
users$ = this.http.get<User[]>("/api/users");
```

Two independent subscriptions can result in two HTTP executions unless the stream is shared.

### Hot Observable

A hot Observable represents a source that exists independently of individual subscribers.

```text
              +--> Subscriber A
              |
Hot Source ---+--> Subscriber B
              |
              +--> Subscriber C
```

Examples include:

- DOM events
- Subjects
- Shared streams
- WebSocket connections

**Interview Question:**

**What is the difference between cold and hot Observables?**

A cold Observable creates its execution for each subscriber, while a hot Observable has a shared/existing producer that subscribers observe.

---

### 🟢 13.7 RxJS Operators

Operators allow us to transform and control Observable streams.

```typescript
users$.pipe(
  map((users) => users.filter((user) => user.active)),
  filter((users) => users.length > 0),
);
```

Common categories:

```text
Creation
    of()
    from()
    interval()

Transformation
    map()
    switchMap()
    mergeMap()
    concatMap()
    exhaustMap()

Filtering
    filter()
    take()
    debounceTime()
    distinctUntilChanged()

Combination
    forkJoin()
    combineLatest()
    zip()
    withLatestFrom()

Error Handling
    catchError()
    retry()

Utility
    tap()
    finalize()

Multicasting
    share()
    shareReplay()
```

Operators are normally used inside `pipe()`:

```typescript
observable$.pipe(operator1(), operator2(), operator3());
```

---

### 🟢 13.8 `map()` Operator

`map()` transforms each emitted value.

```typescript
import { of, map } from "rxjs";

const numbers$ = of(1, 2, 3);

numbers$.pipe(map((value) => value * 2)).subscribe((value) => {
  console.log(value);
});
```

Output:

```text
2
4
6
```

Angular example:

```typescript
users$ = this.userService
  .getUsers()
  .pipe(map((users) => users.map((user) => user.name)));
```

**Use `map()` when:**

You want to transform the value itself.

```text
Input
  ↓
map()
  ↓
Transformed value
```

---

### 🟢 13.9 `filter()` Operator

`filter()` allows only values that satisfy a condition.

```typescript
import { of, filter } from "rxjs";

of(1, 2, 3, 4, 5)
  .pipe(filter((value) => value % 2 === 0))
  .subscribe((value) => {
    console.log(value);
  });
```

Output:

```text
2
4
```

Angular example:

```typescript
activeUsers$ = this.users$.pipe(
  map((users) => users),
  filter((users) => users.length > 0),
);
```

---

### 🟢 13.10 `tap()` Operator

`tap()` performs a side effect without changing the emitted value.

```typescript
this.users$.pipe(
  tap((users) => {
    console.log("Users:", users);
  }),
);
```

Common uses:

```typescript
this.users$.pipe(tap(() => (this.loading = true)));
```

or debugging:

```typescript
this.users$.pipe(
  tap((value) => console.log("Before:", value)),
  map((value) => value.name),
  tap((value) => console.log("After:", value)),
);
```

**Important:**

Use:

```text
map()
```

for transformation.

Use:

```text
tap()
```

for side effects.

Do not use `tap()` to transform values.

---

### 🟢 13.11 `debounceTime()`

`debounceTime()` waits until no new value has been emitted for a specified period.

This is extremely common with search boxes.

```typescript
searchControl.valueChanges.pipe(debounceTime(300));
```

If the user types:

```text
A
An
Ang
Angu
Angular
```

instead of making an API request for every keystroke:

```text
A       → API
An      → API
Ang     → API
Angu    → API
Angular → API
```

the stream waits for 300ms of inactivity:

```text
A
An
Ang
Angu
Angular
       ↓ 300ms
       API
```

Typical implementation:

```typescript
searchResults$ = this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.searchService.search(query)),
);
```

---

### 🟢 13.12 `distinctUntilChanged()`

Prevents consecutive duplicate values from passing through.

```typescript
searchControl.valueChanges.pipe(distinctUntilChanged());
```

Input:

```text
Angular
Angular
Angular
React
React
Spring
```

Output:

```text
Angular
React
Spring
```

It is especially useful with:

- Search boxes
- Filters
- Form controls
- State streams

---

### 🟢 13.13 `take()`

`take()` takes a specific number of emissions and then completes.

```typescript
this.user$.pipe(take(1)).subscribe((user) => {
  console.log(user);
});
```

Example:

```typescript
interval(1000)
  .pipe(take(3))
  .subscribe((value) => {
    console.log(value);
  });
```

Output:

```text
0
1
2
```

After the third value, the Observable completes.

---

### 🟢 13.14 `takeUntil()`

`takeUntil()` keeps the source subscription active until another Observable emits.

Traditional Angular pattern:

```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.users$
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(users => {
      console.log(users);
    });
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

When `destroy$` emits, the subscription is terminated.

In modern Angular, prefer `takeUntilDestroyed()` for component/service lifecycle cleanup.

---

### 🟢 13.15 `takeUntilDestroyed()`

Angular provides `takeUntilDestroyed()` through `@angular/core/rxjs-interop`.

```typescript
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

this.users$.pipe(takeUntilDestroyed()).subscribe((users) => {
  console.log(users);
});
```

Angular automatically completes the subscription when the associated destruction context is destroyed.

This avoids manually creating:

```typescript
destroy$ = new Subject<void>();
```

and implementing:

```typescript
ngOnDestroy();
```

solely for subscription cleanup.

**Interview Point:**

`takeUntilDestroyed()` is the modern Angular approach for lifecycle-aware RxJS subscription cleanup.

---

### 🟢 13.16 `catchError()`

`catchError()` handles errors in an Observable pipeline.

```typescript
this.userService.getUsers().pipe(
  catchError((error) => {
    console.error("API Error:", error);

    return of([]);
  }),
);
```

The replacement Observable determines what happens after the error.

You can also rethrow the error:

```typescript
catchError((error) => {
  console.error(error);

  return throwError(() => error);
});
```

**Important:**

An Observable terminates when an error is emitted.

`catchError()` allows you to replace or rethrow the failed stream.

---

### 🟢 13.17 `finalize()`

`finalize()` executes when an Observable terminates through:

- Completion
- Error
- Unsubscription

Common use case:

```typescript
this.loading = true;

this.userService
  .getUsers()
  .pipe(
    finalize(() => {
      this.loading = false;
    }),
  )
  .subscribe();
```

This is useful for:

- Loading indicators
- Cleanup
- Releasing resources

---

### 🟢 13.18 `retry()`

`retry()` resubscribes to a failed Observable.

```typescript
this.http.get("/api/users").pipe(retry(2));
```

If the request fails:

```text
Attempt 1 → Failed
Attempt 2 → Failed
Attempt 3 → Success/Failed
```

Do not blindly retry every request. Retrying operations that have side effects can cause unintended behavior.

---

### 🟡 13.19 Higher-Order Observables

A higher-order Observable is an Observable that emits other Observables.

For example:

```text
Observable<A>
      |
      | map()
      ↓
Observable<Observable<B>>
```

Angular frequently encounters this pattern when one asynchronous operation starts another.

Example:

```typescript
searchTerms$.pipe(map((term) => this.searchService.search(term)));
```

The result is effectively:

```text
Observable<Observable<SearchResult[]>>
```

Higher-order mapping operators flatten this structure.

The four most important operators are:

```text
switchMap()
mergeMap()
concatMap()
exhaustMap()
```

---

### 🟢 13.20 `switchMap()`

`switchMap()` switches to the latest inner Observable and unsubscribes from the previous inner Observable.

```typescript
searchResults$ = this.searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((query) => this.searchService.search(query)),
);
```

Suppose the user searches:

```text
Angular
React
Spring
```

Conceptually:

```text
Angular request ─────X
React request   ──────X
Spring request ───────────────→ Result
```

Previous inner streams are cancelled when a new value arrives.

**Best use cases:**

- Search/autocomplete
- Live filtering
- Latest-value-wins scenarios
- Requests where previous results are no longer relevant

**Interview Rule:**

> `switchMap` = Latest value wins.

---

### 🟢 13.21 `mergeMap()`

`mergeMap()` subscribes to inner Observables concurrently.

```typescript
items$.pipe(mergeMap((item) => this.api.process(item)));
```

If three items arrive:

```text
Item 1 → Request ───────→
Item 2 → Request ────→
Item 3 → Request ─────────→
```

All can execute concurrently.

**Best use cases:**

- Independent operations
- Parallel processing
- Operations that should not be cancelled

**Interview Rule:**

> `mergeMap` = Run multiple inner operations concurrently.

---

### 🟢 13.22 `concatMap()`

`concatMap()` executes inner Observables sequentially.

```typescript
items$.pipe(concatMap((item) => this.api.save(item)));
```

Execution:

```text
Item 1 → Complete
             ↓
Item 2 → Complete
             ↓
Item 3 → Complete
```

The next operation starts only after the previous one completes.

**Best use cases:**

- Ordered API calls
- Sequential processing
- Operations where order matters

**Interview Rule:**

> `concatMap` = Queue operations and execute them one at a time.

---

**### 🟢 13.23 `exhaustMap()`**

`exhaustMap()` ignores new source emissions while the current inner Observable is running.

```typescript
submitClicks$.pipe(exhaustMap(() => this.submitForm()));
```

If the user clicks repeatedly:

```text
Click 1 → Request starts
Click 2 → Ignored
Click 3 → Ignored
Request completes
Click 4 → Accepted
```

**Best use cases:**

- Preventing duplicate form submissions
- Login buttons
- Payment submission
- Actions where repeated triggers should be ignored while processing

**Interview Rule:**

> `exhaustMap` = Ignore new values while busy.

---

**### 🟢 13.24 switchMap vs mergeMap vs concatMap vs exhaustMap**

| Operator     | Concurrency   | Previous operation | New emission             |
| ------------ | ------------- | ------------------ | ------------------------ |
| `switchMap`  | One active    | Unsubscribed       | Latest replaces previous |
| `mergeMap`   | Multiple      | Continues          | Runs concurrently        |
| `concatMap`  | One at a time | Completes          | Queued                   |
| `exhaustMap` | One active    | Continues          | Ignored while busy       |

**Easy interview memory trick:**

```text
switchMap  → Latest wins
mergeMap   → Everything runs
concatMap  → Queue
exhaustMap → First one wins while busy
```

---

**### 🟢 13.25 Subject**

A `Subject` is both:

- An `Observable`
- An `Observer`

It can receive values through `next()` and multicast them to subscribers.

```typescript
const subject = new Subject<number>();

subject.subscribe((value) => {
  console.log("Subscriber A:", value);
});

subject.subscribe((value) => {
  console.log("Subscriber B:", value);
});

subject.next(10);
subject.next(20);
```

Output:

```text
Subscriber A: 10
Subscriber B: 10
Subscriber A: 20
Subscriber B: 20
```

Subjects are commonly used for:

- Event streams
- Multicasting
- Simple communication between services/components
- Building reactive state patterns

---

**### 🟢 13.26 BehaviorSubject**

`BehaviorSubject` is a Subject that:

- Requires an initial value.
- Stores the latest value.
- Immediately gives the latest value to a new subscriber.

```typescript
const userSubject = new BehaviorSubject<User | null>(null);

userSubject.next({
  id: 1,
  name: "John",
});

userSubject.subscribe((user) => {
  console.log(user);
});
```

The new subscriber immediately receives:

```text
{ id: 1, name: 'John' }
```

This makes `BehaviorSubject` useful for simple shared state.

---

**### 🟢 13.27 Subject vs BehaviorSubject**

| Feature                          | Subject         | BehaviorSubject |
| -------------------------------- | --------------- | --------------- |
| Initial value                    | ❌ Not required | ✅ Required     |
| Stores latest value              | ❌              | ✅              |
| New subscriber gets latest value | ❌              | ✅              |
| `next()` supported               | ✅              | ✅              |
| Common use                       | Events          | Current state   |

Example:

```typescript
// Event
loginClick$ = new Subject<void>();

// State
currentUser$ = new BehaviorSubject<User | null>(null);
```

---

**### 🟡 13.28 ReplaySubject**

`ReplaySubject` stores previous emissions and replays them to new subscribers.

```typescript
const subject = new ReplaySubject<number>(2);

subject.next(1);
subject.next(2);
subject.next(3);

subject.subscribe((value) => {
  console.log(value);
});
```

Output:

```text
2
3
```

Because it was configured to replay the last two values.

```typescript
new ReplaySubject<number>(2);
```

The `2` represents the buffer size.

**Use when:**

New subscribers need access to previous emissions.

---

**### 🟡 13.29 AsyncSubject**

`AsyncSubject` emits only the **last value**, and only when the Observable completes.

```typescript
const subject = new AsyncSubject<number>();

subject.subscribe((value) => {
  console.log(value);
});

subject.next(1);
subject.next(2);
subject.next(3);

subject.complete();
```

Output:

```text
3
```

`AsyncSubject` is less commonly used in normal Angular application development but can appear in RxJS interview questions.

---

**### 🟢 13.30 forkJoin()**

`forkJoin()` waits until all supplied Observables complete and then emits their final values.

This is useful for multiple independent HTTP requests.

```typescript
forkJoin({
  users: this.userService.getUsers(),
  roles: this.roleService.getRoles(),
  settings: this.settingsService.getSettings(),
}).subscribe((result) => {
  console.log(result.users);
  console.log(result.roles);
  console.log(result.settings);
});
```

Execution:

```text
Users API ────────→ Complete
Roles API ─────→ Complete
Settings API ───────→ Complete
                         ↓
                    forkJoin emits
```

**Important:**

If one Observable errors, the combined Observable errors unless the error is handled appropriately.

If an Observable never completes, `forkJoin()` never emits.

---

**### 🟢 13.31 combineLatest()**

`combineLatest()` combines the latest value from multiple Observables.

```typescript
combineLatest([user$, settings$]).subscribe(([user, settings]) => {
  console.log(user);
  console.log(settings);
});
```

It starts emitting only after every source has emitted at least once.

After that, whenever any source emits, it emits the latest value from all sources.

```text
user$      ─── A ─────── B ───────
settings$  ─────── X ─────── Y ───
                    ↓
Output      [A,X] [B,X] [B,Y]
```

Useful for:

- Filters
- Search criteria
- UI state
- Multiple ongoing streams

---

**### 🟢 13.32 forkJoin vs combineLatest**

| Feature                       | `forkJoin()`        | `combineLatest()`                |
| ----------------------------- | ------------------- | -------------------------------- |
| Waits for completion          | ✅                  | ❌                               |
| Emits final values            | ✅                  | ❌                               |
| Continuous stream             | ❌                  | ✅                               |
| Multiple HTTP calls           | Excellent           | Possible but usually unnecessary |
| Emits when one source changes | ❌                  | ✅                               |
| Requires each source to emit  | Completion required | Each must emit at least once     |

**Interview Rule:**

```text
forkJoin      → Give me the final result of everything
combineLatest → Give me the latest state whenever something changes
```

---

**### 🟡 13.33 withLatestFrom()**

`withLatestFrom()` combines the latest value from another Observable when the **source Observable emits**.

```typescript
submit$.pipe(withLatestFrom(formState$)).subscribe(([submit, form]) => {
  console.log(form);
});
```

Here:

```text
submit$     → Triggers output
formState$  → Provides latest value
```

This differs from `combineLatest()` because changes to `formState$` alone do not trigger the output.

---

**### 🟡 13.34 share()**

`share()` allows multiple subscribers to share a single execution of an Observable.

```typescript
users$ = this.http.get<User[]>("/api/users").pipe(share());
```

Without sharing, multiple independent subscriptions can cause multiple executions.

With sharing:

```text
             Subscriber A
                  ↑
                  |
HTTP request → Shared stream
                  |
                  ↓
             Subscriber B
```

The exact behavior depends on the lifecycle of the shared stream.

---

**### 🟡 13.35 shareReplay()**

`shareReplay()` shares an Observable and can replay previously emitted values to later subscribers.

```typescript
users$ = this.http.get<User[]>("/api/users").pipe(shareReplay(1));
```

`1` means the latest emission is replayed.

A common use case is caching the result of an HTTP request for multiple subscribers.

```typescript
@Component({...})
export class UserComponent {
  users$ = this.userService.getUsers().pipe(
    shareReplay(1)
  );
}
```

**Warning:**

Do not use `shareReplay()` blindly. Depending on the stream and configuration, caching can cause:

- Stale data
- Unexpected retained values
- Memory usage

Use it intentionally.

---

**### 🟢 13.36 AsyncPipe**

The `AsyncPipe` subscribes to an Observable or Promise in the Angular template and displays its latest value.

```typescript
users$ = this.userService.getUsers();
```

Template:

```html
<div *ngIf="users$ | async as users">
  <h2>Total Users: {{ users.length }}</h2>

  <div *ngFor="let user of users">{{ user.name }}</div>
</div>
```

Modern Angular control flow:

```html
@if (users$ | async; as users) {
<h2>Total Users: {{ users.length }}</h2>

@for (user of users; track user.id) {
<p>{{ user.name }}</p>
} }
```

**AsyncPipe Benefits:**

- Automatic subscription
- Automatic unsubscription
- Works well with OnPush
- Marks the component for checking when a new value arrives
- Reduces manual subscription code
- Helps prevent subscription leaks

---

**### 🟢 13.37 AsyncPipe vs Manual Subscription**

**Manual subscription:**

```typescript
users: User[] = [];

ngOnInit() {
  this.userService.getUsers().subscribe(users => {
    this.users = users;
  });
}
```

The subscription may need lifecycle management depending on the Observable.

**AsyncPipe:**

```typescript
users$ = this.userService.getUsers();
```

```html
@for (user of users$ | async; track user.id) {
<p>{{ user.name }}</p>
}
```

The template manages the subscription lifecycle.

**Best Practice:**

When data is only needed for template rendering, prefer the `AsyncPipe` instead of manually subscribing.

---

**### 🟡 13.38 Multiple AsyncPipe Subscriptions**

Consider:

```html
<p>{{ user$ | async | json }}</p>
<p>{{ user$ | async }}</p>
```

Depending on the Observable, this can result in multiple subscriptions.

A common approach is:

```html
@if (user$ | async; as user) {
<p>{{ user.name }}</p>
<p>{{ user.email }}</p>
<p>{{ user.role }}</p>
}
```

Now the resolved value is reused inside the block.

For shared/cached streams, `shareReplay()` may also be appropriate depending on the use case.

---

**### 🟢 13.39 RxJS with Angular HttpClient**

Angular's `HttpClient` returns Observables.

```typescript
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/api/users");
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }
}
```

Component:

```typescript
users$ = this.userService.getUsers();
```

Template:

```html
@for (user of users$ | async; track user.id) {
<p>{{ user.name }}</p>
}
```

This creates a clean flow:

```text
Component
    ↓
Service
    ↓
HttpClient
    ↓
HTTP API
    ↓
Observable
    ↓
AsyncPipe
    ↓
Template
```

---

**### 🟡 13.40 RxJS Subscription Management**

Avoid unnecessary nested or unmanaged subscriptions.

**❌ Avoid:**

```typescript
ngOnInit() {
  this.userService.getUser().subscribe(user => {

    this.orderService.getOrders(user.id)
      .subscribe(orders => {

        this.orders = orders;

      });

  });
}
```

Prefer a flattening operator:

```typescript
orders$ = this.userService
  .getUser()
  .pipe(switchMap((user) => this.orderService.getOrders(user.id)));
```

Then:

```html
@for (order of orders$ | async; track order.id) {
<p>{{ order.id }}</p>
}
```

For imperative subscriptions:

```typescript
this.userService
  .getUser()
  .pipe(takeUntilDestroyed())
  .subscribe((user) => {
    // Imperative logic
  });
```

---

**### 🟡 13.41 Common RxJS Mistakes**

**1. Nested subscriptions**

```typescript
// ❌ Avoid
observable1.subscribe((value) => {
  observable2.subscribe((result) => {});
});
```

Prefer:

```typescript
// ✅
observable1.pipe(switchMap((value) => observable2));
```

---

**2. Using `switchMap()` everywhere**

`switchMap()` cancels the previous inner Observable.

If every operation must complete, it may be the wrong choice.

---

**3. Forgetting subscription cleanup**

Long-lived subscriptions can continue after component destruction.

Prefer:

```typescript
AsyncPipe;
```

or:

```typescript
takeUntilDestroyed();
```

---

**4. Using `tap()` for transformation**

```typescript
// ❌
tap((user) => user.name);

// ✅
map((user) => user.name);
```

---

**5. Using an impure state pattern unnecessarily**

Do not use Subjects everywhere simply because they are available. Modern Angular Signals can be a better option for many local/shared state scenarios.

---

**6. Incorrect `shareReplay()` usage**

Caching an Observable without considering its lifecycle can result in stale data or unnecessary memory retention.

---

**### 🟡 13.42 RxJS and Signals**

Modern Angular provides Signals as another reactive primitive.

```typescript
count = signal(0);
```

RxJS:

```typescript
count$ = new BehaviorSubject(0);
```

Signals are particularly useful for:

- Synchronous application state
- Component state
- Derived state
- Fine-grained reactivity

RxJS is particularly useful for:

- Asynchronous streams
- HTTP operations
- Events
- Complex stream transformations
- Combining asynchronous sources

Angular provides interoperability:

```typescript
import { toSignal, toObservable } from "@angular/core/rxjs-interop";
```

Example:

```typescript
users$ = this.userService.getUsers();

users = toSignal(this.users$, {
  initialValue: [],
});
```

**Interview Point:**

Signals and RxJS are not necessarily competing technologies. They solve different but overlapping reactive problems and can be used together.

---

**### 🟢 13.43 RxJS Interview Questions**

**Beginner: What is an Observable?**

**Answer:** An Observable represents a stream of values that can be emitted over time. Consumers subscribe to it to receive values, errors, and completion notifications.

**Beginner: What is the difference between an Observable and a Promise?**

**Answer:** A Promise produces one eventual result, while an Observable can produce multiple values over time and can be composed using RxJS operators.

**Intermediate: What is a Subject?**

**Answer:** A Subject is both an Observable and an Observer. It can receive values through `next()` and multicast those values to multiple subscribers.

**Intermediate: What is the difference between Subject and BehaviorSubject?**

**Answer:** A `Subject` does not store a current value, while a `BehaviorSubject` requires an initial value and immediately provides its latest value to new subscribers.

**Intermediate: What is `switchMap()` used for?**

**Answer:** `switchMap()` switches to the latest inner Observable and unsubscribes from the previous one. It is commonly used for search/autocomplete scenarios where only the latest request matters.

**Advanced: When would you use `concatMap()` instead of `mergeMap()`?**

**Answer:** Use `concatMap()` when operations must execute sequentially and preserve order. Use `mergeMap()` when operations can execute concurrently.

**Advanced: When should you use `exhaustMap()`?**

**Answer:** Use `exhaustMap()` when a new trigger should be ignored while the current operation is still running, such as preventing duplicate form submissions.

**Advanced: What is the difference between `forkJoin()` and `combineLatest()`?**

**Answer:** `forkJoin()` waits for all Observables to complete and emits their final values once. `combineLatest()` emits whenever any source changes after all sources have emitted at least once.

**Advanced: How do you prevent RxJS memory leaks in Angular?**

**Answer:** Prefer `AsyncPipe` for template subscriptions. For imperative subscriptions, use lifecycle-aware cleanup such as `takeUntilDestroyed()`.

---

**### 🟡 13.44 RxJS Follow-up Questions**

1. What happens when an Observable emits an error?
2. What happens after an Observable completes?
3. What is the difference between hot and cold Observables?
4. Why does Angular HttpClient return Observables?
5. Does an HTTP Observable need manual unsubscription?
6. What is the difference between `map()` and `switchMap()`?
7. When would you use `exhaustMap()`?
8. When would `switchMap()` be dangerous?
9. What is the difference between `Subject`, `BehaviorSubject`, and `ReplaySubject`?
10. What happens if an Observable inside `forkJoin()` never completes?
11. What happens if one Observable inside `forkJoin()` errors?
12. What is multicasting?
13. How would you cancel a previous search request?
14. How would you prevent duplicate form submissions?
15. How would you execute API requests sequentially?
16. How would you execute API requests concurrently?
17. How would you combine multiple API calls?
18. What is the difference between `catchError()` and `retry()`?
19. What is the difference between `takeUntil()` and `takeUntilDestroyed()`?
20. What is the difference between Signals and RxJS?

---

**### Key Takeaways: RxJS**

✅ **Observables represent streams of values over time**

✅ **Subscription starts/controls Observable execution**

✅ **AsyncPipe automatically manages template subscriptions**

✅ **`map()` transforms values**

✅ **`filter()` filters values**

✅ **`tap()` performs side effects**

✅ **`debounceTime()` is useful for search/input scenarios**

✅ **`switchMap()` → latest wins**

✅ **`mergeMap()` → concurrent operations**

✅ **`concatMap()` → sequential operations**

✅ **`exhaustMap()` → ignore new triggers while busy**

✅ **`Subject` → multicast stream**

✅ **`BehaviorSubject` → current/latest value**

✅ **`ReplaySubject` → replay previous values**

✅ **`forkJoin()` → final results after all complete**

✅ **`combineLatest()` → latest values from ongoing streams**

✅ **`catchError()` → error handling**

✅ **`finalize()` → cleanup**

✅ **`takeUntilDestroyed()` → Angular lifecycle-aware subscription cleanup**

✅ **Signals and RxJS can work together**

**Most important interview topic:** Understand the behavioral difference between `switchMap`, `mergeMap`, `concatMap`, and `exhaustMap`. You should be able to choose the correct operator for a real-world scenario, not just memorize their definitions.

**## 13. RxJS in Angular**

**### 🟢 13.1 What is RxJS?**

RxJS (Reactive Extensions for JavaScript) is a library used to work with **asynchronous data and data streams**.

Angular uses RxJS for:

- HTTP requests
- Reactive forms
- User events
- Routing events
- Application state
- WebSockets

The main concept in RxJS is the **Observable**.

```typescript
import { Observable } from "rxjs";

users$: Observable<User[]> = this.userService.getUsers();
```

The `$` at the end of `users$` is a common naming convention that indicates the variable is an Observable.

**Simple idea:**

```text
Observable → emits values → subscriber receives values
```

---

**### 🟢 13.2 Observable**

An Observable represents a stream of values that can arrive over time.

```typescript
import { Observable } from "rxjs";

const numbers$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});
```

To receive the values:

```typescript
numbers$.subscribe((value) => {
  console.log(value);
});
```

Output:

```text
1
2
3
```

An Observable can:

- Emit multiple values
- Complete
- Produce an error

**Interview Point:** An Observable does not normally start producing values until it is subscribed to.

---

**### 🟢 13.3 Subscription**

A subscription is created when we subscribe to an Observable.

```typescript
const subscription = users$.subscribe((users) => {
  console.log(users);
});
```

You can stop the subscription using:

```typescript
subscription.unsubscribe();
```

In Angular, manually managing subscriptions is often unnecessary when using:

```typescript
AsyncPipe;
```

or:

```typescript
takeUntilDestroyed();
```

---

**### 🟢 13.4 Observable vs Promise**

| Observable               | Promise                            |
| ------------------------ | ---------------------------------- |
| Can emit multiple values | Produces one result                |
| Can be unsubscribed      | Cannot normally be cancelled       |
| Supports RxJS operators  | Uses Promise methods               |
| Represents streams       | Represents one asynchronous result |
| Used heavily by Angular  | Native JavaScript feature          |

Angular's `HttpClient` returns Observables:

```typescript
users$ = this.http.get<User[]>("/api/users");
```

---

**### 🟢 13.5 RxJS Operators**

Operators are used to modify or control Observable streams.

```typescript
users$.pipe(map((users) => users.filter((user) => user.active)));
```

Important operators for Angular interviews:

```text
map()
filter()
tap()
debounceTime()
distinctUntilChanged()
switchMap()
mergeMap()
concatMap()
exhaustMap()
catchError()
finalize()
forkJoin()
combineLatest()
```

---

**### 🟢 13.6 map()**

`map()` transforms each emitted value.

```typescript
of(1, 2, 3).pipe(map((value) => value * 2));
```

Result:

```text
2
4
6
```

**Remember:** `map()` = transform the value.

---

**### 🟢 13.7 filter()**

`filter()` allows only values that satisfy a condition.

```typescript
of(1, 2, 3, 4).pipe(filter((value) => value % 2 === 0));
```

Result:

```text
2
4
```

**Remember:** `filter()` = keep only matching values.

---

**### 🟢 13.8 tap()**

`tap()` is used for side effects such as logging or debugging.

```typescript
users$.pipe(tap((users) => console.log(users)));
```

`tap()` does not change the emitted value.

**Remember:**

```text
map() → changes data
tap() → performs an action
```

---

**### 🟢 13.9 debounceTime()**

`debounceTime()` waits for a specified amount of time before emitting a value.

It is commonly used for search boxes.

```typescript
searchControl.valueChanges.pipe(debounceTime(300));
```

If the user types:

```text
A → An → Ang → Angular
```

Angular waits until the user stops typing before processing the search.

---

**### 🟢 13.10 distinctUntilChanged()**

Prevents consecutive duplicate values.

```typescript
searchControl.valueChanges.pipe(distinctUntilChanged());
```

Input:

```text
Angular
Angular
React
React
Spring
```

Output:

```text
Angular
React
Spring
```

---

**### 🟢 13.11 switchMap()**

`switchMap()` switches to the latest Observable and unsubscribes from the previous one.

A common example is a search box:

```typescript
searchResults$ = searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap((query) => this.searchService.search(query)),
);
```

If the user searches:

```text
Angular → React → Spring
```

only the latest search is important.

**Remember:**

> `switchMap()` = Latest value wins.

**Common use cases:**

- Search
- Autocomplete
- Live filtering

---

**### 🟢 13.12 mergeMap()**

`mergeMap()` allows multiple inner Observables to run at the same time.

```typescript
items$.pipe(mergeMap((item) => this.processItem(item)));
```

If three items arrive, all three operations can run concurrently.

**Remember:**

> `mergeMap()` = Run operations concurrently.

---

**### 🟢 13.13 concatMap()**

`concatMap()` runs operations one after another.

```typescript
items$.pipe(concatMap((item) => this.saveItem(item)));
```

Execution:

```text
Item 1 → complete
Item 2 → complete
Item 3 → complete
```

**Remember:**

> `concatMap()` = Queue operations and preserve order.

---

**### 🟢 13.14 exhaustMap()**

`exhaustMap()` ignores new values while the current operation is running.

```typescript
submitClick$.pipe(exhaustMap(() => this.submitForm()));
```

If the user clicks Submit multiple times:

```text
Click 1 → Accepted
Click 2 → Ignored
Click 3 → Ignored
Request completes
Click 4 → Accepted
```

**Common use case:**

Preventing duplicate form submissions.

**Remember:**

> `exhaustMap()` = Ignore new values while busy.

---

**### 🟢 13.15 switchMap vs mergeMap vs concatMap vs exhaustMap**

| Operator     | Behavior                      | Common Use             |
| ------------ | ----------------------------- | ---------------------- |
| `switchMap`  | Cancels previous              | Search                 |
| `mergeMap`   | Runs concurrently             | Independent operations |
| `concatMap`  | Runs sequentially             | Ordered operations     |
| `exhaustMap` | Ignores new values while busy | Form submission        |

Easy way to remember:

```text
switchMap  → Latest
mergeMap   → All
concatMap  → Queue
exhaustMap → First
```

---

**### 🟢 13.16 Subject**

A `Subject` is both an Observable and an Observer.

It can send values to multiple subscribers.

```typescript
const subject = new Subject<number>();

subject.subscribe((value) => console.log("A:", value));
subject.subscribe((value) => console.log("B:", value));

subject.next(10);
```

Both subscribers receive `10`.

Subjects are commonly used for:

- Events
- Multicasting
- Communication between services

---

**### 🟢 13.17 BehaviorSubject**

A `BehaviorSubject` is similar to a Subject but stores the latest value.

It requires an initial value.

```typescript
const user$ = new BehaviorSubject<User | null>(null);

user$.next(user);
```

A new subscriber immediately receives the current value.

### Subject vs BehaviorSubject

| Subject                           | BehaviorSubject                   |
| --------------------------------- | --------------------------------- |
| No initial value                  | Requires initial value            |
| Does not store current value      | Stores latest value               |
| New subscriber gets future values | New subscriber gets current value |

**Common use:** Simple shared application state.

---

**### 🟡 13.18 ReplaySubject**

`ReplaySubject` can replay previous values to new subscribers.

```typescript
const subject = new ReplaySubject<number>(2);

subject.next(1);
subject.next(2);
subject.next(3);
```

A new subscriber receives:

```text
2
3
```

because the last two values were configured to be replayed.

---

**### 🟢 13.19 catchError()**

`catchError()` handles errors from an Observable.

```typescript
this.userService.getUsers().pipe(
  catchError((error) => {
    console.error(error);
    return of([]);
  }),
);
```

It can:

- Return a fallback value
- Return another Observable
- Rethrow the error

---

**### 🟢 13.20 finalize()**

`finalize()` runs when an Observable finishes, errors, or is unsubscribed.

Common use case: loading indicators.

```typescript
this.loading = true;

this.userService.getUsers().pipe(finalize(() => (this.loading = false)));
```

---

**### 🟢 13.21 forkJoin()**

`forkJoin()` waits for multiple Observables to complete and then gives their final results.

```typescript
forkJoin({
  users: this.userService.getUsers(),
  roles: this.roleService.getRoles(),
}).subscribe((result) => {
  console.log(result.users);
  console.log(result.roles);
});
```

Common use case:

> Make multiple independent API calls and wait until all are complete.

---

**### 🟢 13.22 combineLatest()**

`combineLatest()` combines the latest values from multiple Observables.

```typescript
combineLatest([user$, settings$]).subscribe(([user, settings]) => {
  console.log(user, settings);
});
```

It is useful when the application needs the **current/latest value from multiple ongoing streams**.

### forkJoin vs combineLatest

| `forkJoin`                      | `combineLatest`                 |
| ------------------------------- | ------------------------------- |
| Waits for completion            | Continues listening             |
| Emits final values              | Emits whenever a source changes |
| Good for multiple HTTP requests | Good for ongoing streams        |

---

**### 🟢 13.23 AsyncPipe**

`AsyncPipe` subscribes to an Observable in the template and automatically unsubscribes when the component is destroyed.

```typescript
users$ = this.userService.getUsers();
```

```html
@for (user of users$ | async; track user.id) {
<p>{{ user.name }}</p>
}
```

Benefits:

- Automatic subscription
- Automatic unsubscription
- Less component code
- Helps prevent subscription leaks
- Works well with OnPush change detection

**Best Practice:**

If the Observable is only needed to display data in the template, prefer `AsyncPipe` over manually subscribing.

---

**### 🟢 13.24 takeUntilDestroyed()**

Modern Angular provides `takeUntilDestroyed()` for automatic subscription cleanup.

```typescript
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

this.userService
  .getUsers()
  .pipe(takeUntilDestroyed())
  .subscribe((users) => {
    console.log(users);
  });
```

The subscription is automatically cleaned up when the Angular component/directive/service's destruction context is destroyed.

---

**### 🟡 13.25 Cold vs Hot Observable**

### Cold Observable

Each subscriber gets its own execution.

```text
Subscriber A → Execution A
Subscriber B → Execution B
```

Angular HTTP Observables are commonly cold.

### Hot Observable

The source exists independently of subscribers and can be shared.

```text
             → Subscriber A
Source ──────→ Subscriber B
             → Subscriber C
```

Subjects are a common example.

**Interview Question:**

> What is the difference between cold and hot Observables?

**Answer:** A cold Observable creates its execution for each subscriber, while a hot Observable has a shared/existing source that subscribers observe.

---

**### 🟡 13.26 RxJS with Angular HTTP**

Angular's `HttpClient` returns Observables.

```typescript
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}
```

Component:

```typescript
users$ = this.userService.getUsers();
```

Template:

```html
@for (user of users$ | async; track user.id) {
<p>{{ user.name }}</p>
}
```

Typical flow:

```text
Component
    ↓
Service
    ↓
HttpClient
    ↓
Backend API
    ↓
Observable
    ↓
AsyncPipe
    ↓
Template
```

---

**### 🟡 13.27 Common RxJS Mistakes**

**1. Nested subscriptions**

```typescript
// ❌ Avoid
user$.subscribe((user) => {
  orders$.subscribe((orders) => {});
});
```

Use an operator such as `switchMap()` instead.

**2. Using `switchMap()` everywhere**

`switchMap()` cancels the previous operation. It is not suitable when every operation must complete.

**3. Forgetting subscription cleanup**

Use:

```text
AsyncPipe
```

or:

```text
takeUntilDestroyed()
```

when appropriate.

**4. Using `tap()` for transformation**

```text
map() → transformation
tap() → side effect
```

**5. Using Subjects everywhere**

Subjects are useful, but modern Angular Signals can be a better choice for many state-management scenarios.

---

**### 🟡 13.28 RxJS and Signals**

Angular Signals and RxJS are both reactive technologies, but they are useful for different situations.

| Signals                               | RxJS                              |
| ------------------------------------- | --------------------------------- |
| Great for application/component state | Great for asynchronous streams    |
| Synchronous                           | Handles asynchronous streams well |
| `signal()`                            | `Observable`                      |
| `computed()`                          | RxJS operators                    |
| Fine-grained reactivity               | Stream processing                 |

They can also work together.

Angular provides:

```typescript
toSignal();
toObservable();
```

Example:

```typescript
users$ = this.userService.getUsers();

users = toSignal(users$, {
  initialValue: [],
});
```

**Interview Point:**

Signals do not replace RxJS completely. RxJS remains very useful for HTTP streams, events, complex asynchronous operations, and stream composition.

---

**### 🟢 13.29 RxJS Interview Questions**

**Beginner: What is an Observable?**

**Answer:** An Observable represents a stream of values that can be emitted over time.

**Beginner: Observable vs Promise?**

**Answer:** A Promise produces one result, while an Observable can produce multiple values and can be composed using RxJS operators.

**Intermediate: What is a Subject?**

**Answer:** A Subject is both an Observable and an Observer and can multicast values to multiple subscribers.

**Intermediate: Subject vs BehaviorSubject?**

**Answer:** A BehaviorSubject stores the latest value and immediately gives it to new subscribers, while a Subject does not.

**Intermediate: What is switchMap used for?**

**Answer:** It switches to the latest Observable and cancels the previous one. It is commonly used for search and autocomplete.

**Advanced: switchMap vs mergeMap?**

**Answer:** `switchMap` cancels the previous inner operation when a new value arrives, while `mergeMap` allows multiple inner operations to run concurrently.

**Advanced: concatMap vs mergeMap?**

**Answer:** `concatMap` runs operations sequentially in order, while `mergeMap` runs them concurrently.

**Advanced: When would you use exhaustMap?**

**Answer:** When new triggers should be ignored while the current operation is running, such as preventing duplicate form submissions.

**Advanced: forkJoin vs combineLatest?**

**Answer:** `forkJoin` waits for all Observables to complete and emits their final values. `combineLatest` continues emitting whenever any source changes after all sources have emitted at least once.

**Advanced: How do you prevent memory leaks from RxJS subscriptions?**

**Answer:** Prefer `AsyncPipe` for template subscriptions and use `takeUntilDestroyed()` or another appropriate cleanup strategy for imperative subscriptions.

---

**### 🟡 13.30 RxJS Follow-up Questions**

1. What is the difference between cold and hot Observables?
2. Why does Angular HttpClient return Observables?
3. What happens when an Observable throws an error?
4. What happens after an Observable completes?
5. When should you use `switchMap()`?
6. When should you use `mergeMap()`?
7. When should you use `concatMap()`?
8. When should you use `exhaustMap()`?
9. What is the difference between `Subject`, `BehaviorSubject`, and `ReplaySubject`?
10. What happens if an Observable in `forkJoin()` never completes?
11. What happens if one Observable in `forkJoin()` throws an error?
12. What is the difference between `map()` and `switchMap()`?
13. What is the difference between `catchError()` and `retry()`?
14. Why should nested subscriptions generally be avoided?
15. How do you cancel a previous search request?
16. How do you prevent duplicate form submissions?
17. How do you execute API calls sequentially?
18. How do you execute API calls concurrently?
19. What is the difference between RxJS and Signals?
20. What is `takeUntilDestroyed()`?

---

**### Key Takeaways: RxJS**

✅ **Observable** → Stream of values over time
✅ **Subscription** → Subscribes to an Observable
✅ **map()** → Transform values
✅ **filter()** → Filter values
✅ **tap()** → Perform side effects
✅ **debounceTime()** → Wait before processing input
✅ **switchMap()** → Latest value wins
✅ **mergeMap()** → Run concurrently
✅ **concatMap()** → Run sequentially
✅ **exhaustMap()** → Ignore new values while busy
✅ **Subject** → Multicast values
✅ **BehaviorSubject** → Stores latest value
✅ **ReplaySubject** → Replays previous values
✅ **forkJoin()** → Wait for all to complete
✅ **combineLatest()** → Latest values from multiple streams
✅ **AsyncPipe** → Automatic subscription management
✅ **takeUntilDestroyed()** → Automatic lifecycle cleanup
✅ **Signals + RxJS** → Can be used together

## 14. Forms

### 🟢 14.1 What are Angular Forms?

Angular Forms provide APIs for collecting, validating, and managing user input.

Angular provides two main approaches:

```text
Angular Forms
     |
     +── Template-driven Forms
     |
     +── Reactive Forms
```

### Template-driven Forms

Form logic is mainly defined in the HTML template.

### Reactive Forms

Form logic is mainly defined in the TypeScript class.

**Interview Point:** Reactive Forms are generally preferred for complex enterprise applications because they provide better control, scalability, and testability.

---

**### 🟢 14.2 Template-driven Forms**

Template-driven forms use directives such as:

- `ngForm`
- `ngModel`
- `ngSubmit`

Example:

```typescript
@Component({
  selector: "app-login",
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
      <input name="email" [(ngModel)]="email" required email />

      <input name="password" [(ngModel)]="password" required type="password" />

      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  email = "";
  password = "";

  login(form: NgForm) {
    console.log(form.value);
  }
}
```

The form state is automatically created by Angular.

---

**### 🟢 14.3 Two-way Binding with ngModel**

`ngModel` provides two-way binding between the component and the form control.

```html
<input [(ngModel)]="username" name="username" />
```

This means:

```text
Component → Template
Template → Component
```

For example:

```typescript
username = "John";
```

```html
<input [(ngModel)]="username" />
```

Changing the input updates `username`, and changing `username` updates the input.

---

**### 🟢 14.4 Template-driven Form Validation**

Common validators:

```html
<input name="email" [(ngModel)]="email" required email />
```

Angular provides states such as:

```text
valid
invalid
touched
untouched
dirty
pristine
submitted
```

Example:

```html
<input
  name="email"
  [(ngModel)]="email"
  required
  email
  #emailControl="ngModel"
/>

@if (emailControl.invalid && emailControl.touched) {
<p>Enter a valid email.</p>
}
```

---

**### 🟢 14.5 Reactive Forms**

Reactive Forms define the form structure in TypeScript.

Important classes:

- `FormControl`
- `FormGroup`
- `FormArray`
- `FormBuilder`

Example:

```typescript
import { FormControl, FormGroup, Validators } from "@angular/forms";

loginForm = new FormGroup({
  email: new FormControl("", [Validators.required, Validators.email]),

  password: new FormControl("", [Validators.required, Validators.minLength(6)]),
});
```

Template:

```html
<form [formGroup]="loginForm" (ngSubmit)="login()">
  <input formControlName="email" />

  <input type="password" formControlName="password" />

  <button type="submit" [disabled]="loginForm.invalid">Login</button>
</form>
```

---

**### 🟢 14.6 FormControl**

`FormControl` represents a single form field.

```typescript
name = new FormControl("");
```

With validation:

```typescript
name = new FormControl("", [Validators.required, Validators.minLength(3)]);
```

You can access:

```typescript
name.value;
name.valid;
name.invalid;
name.touched;
name.dirty;
name.errors;
```

---

**### 🟢 14.7 FormGroup**

`FormGroup` represents a collection of related controls.

```typescript
userForm = new FormGroup({
  name: new FormControl(""),
  email: new FormControl(""),
  age: new FormControl(0),
});
```

The form value looks like:

```typescript
{
  name: 'John',
  email: 'john@example.com',
  age: 25
}
```

You can check the entire form:

```typescript
userForm.valid;
userForm.invalid;
userForm.value;
```

---

**### 🟢 14.8 FormArray**

`FormArray` is used when the number of controls is dynamic.

For example, a user can add multiple phone numbers.

```typescript
phoneNumbers = new FormArray([new FormControl("")]);
```

Add another control:

```typescript
this.phoneNumbers.push(new FormControl(""));
```

Template:

```html
<div formArrayName="phoneNumbers">
  @for (control of phoneNumbers.controls; track $index) {
  <input [formControlName]="$index" />
  }
</div>
```

**Common use cases:**

- Multiple addresses
- Multiple phone numbers
- Dynamic products
- Dynamic form fields

---

**### 🟢 14.9 FormBuilder**

`FormBuilder` provides a shorter way to create reactive forms.

```typescript
constructor(private fb: FormBuilder) {}

userForm = this.fb.group({
  name: ['', Validators.required],

  email: ['', [
    Validators.required,
    Validators.email
  ]],

  age: [0, Validators.min(18)]
});
```

Instead of:

```typescript
new FormGroup({
  name: new FormControl(""),
});
```

you can use:

```typescript
this.fb.group({
  name: [""],
});
```

---

**### 🟢 14.10 Common Validators**

Angular provides built-in validators:

```typescript
Validators.required;
Validators.requiredTrue;
Validators.email;
Validators.min();
Validators.max();
Validators.minLength();
Validators.maxLength();
Validators.pattern();
```

Example:

```typescript
email: ["", [Validators.required, Validators.email]];
```

Check errors:

```typescript
if (this.userForm.get("email")?.hasError("required")) {
  console.log("Email is required");
}
```

---

**### 🟢 14.11 Form States**

Angular forms maintain different states.

| State       | Meaning                            |
| ----------- | ---------------------------------- |
| `valid`     | All validations pass               |
| `invalid`   | One or more validations fail       |
| `touched`   | User has interacted with the field |
| `untouched` | User has not interacted            |
| `dirty`     | Value has changed                  |
| `pristine`  | Value has not changed              |
| `pending`   | Async validation is running        |
| `disabled`  | Control is disabled                |
| `enabled`   | Control is enabled                 |

Example:

```html
@if ( emailControl.invalid && emailControl.touched ) {
<p>Invalid email</p>
}
```

---

**### 🟢 14.12 setValue() vs patchValue()**

Both methods update form values.

### setValue()

Requires values for all controls.

```typescript
this.userForm.setValue({
  name: "John",
  email: "john@example.com",
  age: 25,
});
```

Missing a required control causes an error.

### patchValue()

Updates only the controls provided.

```typescript
this.userForm.patchValue({
  name: "John",
});
```

**Interview Rule:**

```text
setValue()  → Complete form value
patchValue() → Partial form value
```

---

**### 🟢 14.13 reset()**

`reset()` resets the form.

```typescript
this.userForm.reset();
```

You can also provide default values:

```typescript
this.userForm.reset({
  name: "John",
  email: "",
});
```

---

**### 🟢 14.14 valueChanges**

`valueChanges` is an Observable that emits whenever a form control's value changes.

```typescript
this.searchControl.valueChanges.subscribe((value) => {
  console.log(value);
});
```

Common use:

```typescript
this.searchControl.valueChanges
  .pipe(debounceTime(300), distinctUntilChanged())
  .subscribe((value) => {
    this.search(value);
  });
```

---

**### 🟢 14.15 statusChanges**

`statusChanges` emits whenever the validation status changes.

```typescript
this.userForm.statusChanges.subscribe((status) => {
  console.log(status);
});
```

Possible values include:

```text
VALID
INVALID
PENDING
DISABLED
```

---

**### 🟡 14.16 Custom Validators**

You can create your own validator.

```typescript
export function noSpaceValidator(
  control: AbstractControl,
): ValidationErrors | null {
  if (control.value?.includes(" ")) {
    return { noSpace: true };
  }

  return null;
}
```

Use it:

```typescript
username = new FormControl("", [Validators.required, noSpaceValidator]);
```

A validator returns:

```text
null       → Valid
object     → Invalid
```

---

**### 🟡 14.17 Cross-field Validation**

Sometimes validation depends on multiple fields.

Example: password and confirm password.

```typescript
function passwordMatchValidator(
  group: AbstractControl,
): ValidationErrors | null {
  const password = group.get("password")?.value;
  const confirm = group.get("confirmPassword")?.value;

  return password === confirm ? null : { passwordMismatch: true };
}
```

Apply it to the `FormGroup`.

```typescript
registerForm = this.fb.group(
  {
    password: [""],
    confirmPassword: [""],
  },
  {
    validators: passwordMatchValidator,
  },
);
```

---

**### 🟡 14.18 Async Validators**

Async validators are used when validation requires an asynchronous operation.

Example:

```text
User enters username
       ↓
Angular calls API
       ↓
Is username available?
       ↓
VALID / INVALID
```

Common use cases:

- Username availability
- Email uniqueness
- Server-side validation

The form status becomes:

```text
PENDING
```

while the async validator is running.

---

**### 🟡 14.19 Reactive Forms vs Template-driven Forms**

| Reactive Forms              | Template-driven Forms            |
| --------------------------- | -------------------------------- |
| Form logic in TypeScript    | Form logic mainly in template    |
| More explicit               | More implicit                    |
| Easier to test              | More difficult for complex forms |
| Better for complex forms    | Good for simple forms            |
| Supports dynamic forms well | Less suitable for dynamic forms  |
| More scalable               | Simpler for small forms          |

**Interview Rule:**

> Use Template-driven Forms for simple forms and Reactive Forms when you need complex validation, dynamic controls, or greater programmatic control.

---

**### 🟡 14.20 ControlValueAccessor**

`ControlValueAccessor` allows a custom component to behave like a normal Angular form control.

For example:

```text
Custom Date Picker
Custom Dropdown
Custom Toggle
Custom Input
```

can work with:

```html
<form [formGroup]="form">
  <app-custom-input formControlName="username"> </app-custom-input>
</form>
```

It acts as a bridge between Angular Forms and the custom component.

**Interview Point:**

`ControlValueAccessor` is commonly used when creating reusable custom form controls.

---

**### 🟢 14.21 Forms Interview Questions**

**Beginner: What are the two types of Angular Forms?**

**Answer:** Template-driven Forms and Reactive Forms.

**Beginner: What is FormControl?**

**Answer:** `FormControl` represents the value and validation state of an individual form field.

**Intermediate: What is FormGroup?**

**Answer:** `FormGroup` groups multiple form controls and manages their combined value and validation state.

**Intermediate: FormControl vs FormGroup vs FormArray?**

**Answer:** `FormControl` represents one field, `FormGroup` represents a group of related controls, and `FormArray` represents a dynamic collection of controls.

**Intermediate: setValue() vs patchValue()?**

**Answer:** `setValue()` requires values for all controls, while `patchValue()` can update only selected controls.

**Intermediate: Why are Reactive Forms preferred for complex applications?**

**Answer:** They provide explicit form models, better programmatic control, easier testing, dynamic form support, and scalable validation.

**Advanced: What is ControlValueAccessor?**

**Answer:** It is an interface that allows custom components to integrate with Angular's Forms API as form controls.

---

**### 🟡 14.22 Forms Follow-up Questions**

1. What is the difference between `touched` and `dirty`?
2. What is the difference between `pristine` and `untouched`?
3. What is `valueChanges`?
4. What is `statusChanges`?
5. How do you create a custom validator?
6. How do you validate two fields together?
7. What is an async validator?
8. What does `PENDING` mean?
9. How do you create dynamic form fields?
10. When would you use `FormArray`?
11. What is `ControlValueAccessor`?
12. How would you prevent a form from being submitted when invalid?

---

**### Key Takeaways: Forms**

✅ **Template-driven Forms** → Simple forms
✅ **Reactive Forms** → Complex and scalable forms
✅ **FormControl** → Single field
✅ **FormGroup** → Group of controls
✅ **FormArray** → Dynamic collection
✅ **FormBuilder** → Simplifies reactive form creation
✅ **Validators** → Validate form input
✅ **setValue()** → Updates complete form structure
✅ **patchValue()** → Updates selected controls
✅ **valueChanges** → Observable of value changes
✅ **statusChanges** → Observable of validation status
✅ **ControlValueAccessor** → Custom form controls

---

## 15. Routing and Navigation

### 🟢 15.1 What is Angular Routing?

Angular Router allows a single-page application to display different components based on the URL.

Example:

```text
/users       → UsersComponent
/products    → ProductsComponent
/login       → LoginComponent
/dashboard   → DashboardComponent
```

The browser URL changes without performing a complete page reload.

---

**### 🟢 15.2 Basic Routing**

Define routes:

```typescript
import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "users",
    component: UsersComponent,
  },
];
```

Configure the router:

```typescript
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
```

---

**### 🟢 15.3 RouterOutlet**

`RouterOutlet` is the location where Angular renders the component associated with the current route.

```html
<nav>
  <a routerLink="/home">Home</a>
  <a routerLink="/users">Users</a>
</nav>

<router-outlet></router-outlet>
```

If the URL is:

```text
/users
```

Angular renders:

```text
UsersComponent
```

inside:

```html
<router-outlet></router-outlet>
```

---

**### 🟢 15.4 routerLink**

`routerLink` is used for navigation from templates.

```html
<a routerLink="/home">Home</a>

<a routerLink="/users">Users</a>
```

Dynamic route:

```html
<a [routerLink]="['/users', user.id]"> View User </a>
```

---

**### 🟢 15.5 Programmatic Navigation**

Use `Router` when navigation needs to happen from TypeScript.

```typescript
constructor(private router: Router) {}

goToUsers() {
  this.router.navigate(['/users']);
}
```

With route parameters:

```typescript
this.router.navigate(["/users", userId]);
```

---

**### 🟢 15.6 Route Parameters**

Route:

```typescript
{
  path: 'users/:id',
  component: UserComponent
}
```

URL:

```text
/users/101
```

Read the parameter:

```typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}
```

For a value that can change while the same component remains active:

```typescript
this.route.paramMap.subscribe((params) => {
  const id = params.get("id");
});
```

---

**### 🟢 15.7 Query Parameters**

Query parameters are added after `?`.

Example:

```text
/users?page=2&sort=name
```

Navigate:

```typescript
this.router.navigate(["/users"], {
  queryParams: {
    page: 2,
    sort: "name",
  },
});
```

Read them:

```typescript
this.route.queryParams.subscribe((params) => {
  console.log(params["page"]);
});
```

Modern Angular can also use:

```typescript
this.route.queryParamMap.subscribe((params) => {
  const page = params.get("page");
});
```

---

**### 🟢 15.8 Route Parameters vs Query Parameters**

| Route Parameter               | Query Parameter              |
| ----------------------------- | ---------------------------- |
| `/users/101`                  | `/users?page=2`              |
| Usually identifies a resource | Usually controls/filter data |
| Defined in route path         | Optional                     |
| `:id`                         | `?page=2`                    |

Example:

```text
/users/101
     ↑
 Route parameter
```

```text
/users?page=2
       ↑
 Query parameter
```

---

**### 🟢 15.9 Child Routes**

Child routes create nested navigation.

```typescript
{
  path: 'admin',
  component: AdminComponent,

  children: [
    {
      path: 'users',
      component: AdminUsersComponent
    },
    {
      path: 'settings',
      component: AdminSettingsComponent
    }
  ]
}
```

URL:

```text
/admin/users
/admin/settings
```

The parent component needs its own:

```html
<router-outlet></router-outlet>
```

for child components.

---

**### 🟡 15.10 Lazy Loading**

Lazy loading loads a feature only when it is needed.

Modern Angular:

```typescript
{
  path: 'admin',
  loadComponent: () =>
    import('./admin/admin.component')
      .then(m => m.AdminComponent)
}
```

Or lazy-load routes:

```typescript
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
}
```

Benefits:

- Smaller initial bundle
- Faster initial loading
- Better application performance

---

**### 🟢 15.11 Route Guards**

Route guards control whether navigation is allowed.

Common guards include:

- `CanActivate`
- `CanActivateChild`
- `CanDeactivate`

Modern Angular commonly uses functional guards.

Example:

```typescript
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.isLoggedIn();
};
```

Use it:

```typescript
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

If the user is not authenticated, navigation can be prevented or redirected.

---

**### 🟢 15.12 CanActivate**

`CanActivate` determines whether a user can enter a route.

Example:

```text
User
 ↓
/dashboard
 ↓
Authentication check
 ↓
Logged in? ── Yes → Dashboard
       |
       No
       ↓
     Login
```

Common use case:

- Authentication
- Authorization
- Role checking

---

**### 🟡 15.13 CanActivateChild**

`CanActivateChild` protects child routes.

```typescript
{
  path: 'admin',
  canActivateChild: [adminGuard],

  children: [
    {
      path: 'users',
      component: UsersComponent
    },
    {
      path: 'settings',
      component: SettingsComponent
    }
  ]
}
```

The guard can protect all child routes under `/admin`.

---

**### 🟡 15.14 CanDeactivate**

`CanDeactivate` controls whether the user can leave a route.

Common example:

```text
User editing form
       ↓
Clicks another page
       ↓
Unsaved changes?
       ↓
Yes → "Are you sure?"
No  → Navigate
```

Typical use case:

- Unsaved forms
- Draft editors
- Complex data-entry screens

---

**### 🟡 15.15 Route Resolvers**

A resolver loads data before activating a route.

Conceptually:

```text
Navigate
   ↓
Resolver
   ↓
Load data
   ↓
Component created
```

Example:

```typescript
export const userResolver: ResolveFn<User> = () => {
  return inject(UserService).getUser();
};
```

Route:

```typescript
{
  path: 'users/:id',
  component: UserComponent,
  resolve: {
    user: userResolver
  }
}
```

Resolvers can be useful when the component should receive required route data before rendering.

---

**### 🟢 15.16 ActivatedRoute**

`ActivatedRoute` provides information about the currently activated route.

It can provide:

- Route parameters
- Query parameters
- Route data
- URL segments
- Resolved data

Example:

```typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.paramMap.subscribe(params => {
    console.log(params.get('id'));
  });
}
```

---

**### 🟡 15.17 Route Data**

Static data can be attached to a route.

```typescript
{
  path: 'admin',
  component: AdminComponent,
  data: {
    title: 'Administration'
  }
}
```

Read it:

```typescript
this.route.data.subscribe((data) => {
  console.log(data["title"]);
});
```

Route data can also contain information produced by resolvers.

---

**### 🟡 15.18 Wildcard Route**

A wildcard route handles URLs that don't match any defined route.

```typescript
{
  path: '**',
  component: NotFoundComponent
}
```

It should generally be placed **after specific routes**.

Example:

```typescript
export const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];
```

---

**### 🟢 15.19 Route Order**

Angular evaluates routes in order.

```typescript
[
  { path: "users", component: UsersComponent },
  { path: "**", component: NotFoundComponent },
];
```

If `**` appears first, it can catch routes before the intended routes are reached.

**Interview Point:**

> Specific routes should generally appear before wildcard routes.

---

**### 🟡 15.20 Router Events**

Angular Router provides navigation events.

```typescript
this.router.events.subscribe((event) => {
  console.log(event);
});
```

Common events include:

```text
NavigationStart
RoutesRecognized
GuardsCheckStart
GuardsCheckEnd
ResolveStart
ResolveEnd
NavigationEnd
NavigationCancel
NavigationError
```

These can be useful for:

- Loading indicators
- Logging
- Debugging navigation
- Analytics

---

**### 🟡 15.21 Navigation Flow**

A simplified navigation flow is:

```text
User navigates
      ↓
Router starts navigation
      ↓
Route matching
      ↓
Guards
      ↓
Resolvers
      ↓
Component activation
      ↓
RouterOutlet renders component
      ↓
NavigationEnd
```

Not every route necessarily uses guards or resolvers.

---

**### 🟡 15.22 Authentication and Routing**

A common enterprise flow:

```text
User
 ↓
/dashboard
 ↓
Auth Guard
 ↓
Token/session valid?
 ├── Yes → Dashboard
 └── No  → /login
```

Example:

```typescript
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(["/login"]);
};
```

**Important:** Route guards improve client-side navigation control, but they are **not a security boundary**. The backend must independently enforce authentication and authorization.

---

**### 🟢 15.23 Routing Interview Questions**

**Beginner: What is Angular Router?**

**Answer:** Angular Router allows an Angular single-page application to display different components based on the URL without performing a full page reload.

**Beginner: What is RouterOutlet?**

**Answer:** `RouterOutlet` is the placeholder where Angular renders the component associated with the active route.

**Intermediate: What is the difference between routerLink and Router.navigate()?**

**Answer:** `routerLink` is primarily used for navigation in templates, while `Router.navigate()` is used for programmatic navigation in TypeScript.

**Intermediate: Route parameter vs query parameter?**

**Answer:** Route parameters are part of the route path, such as `/users/10`, while query parameters are optional values after `?`, such as `/users?page=2`.

**Intermediate: What is lazy loading?**

**Answer:** Lazy loading loads a feature or component only when the user navigates to it, reducing the initial JavaScript bundle and improving initial load performance.

**Intermediate: What is a route guard?**

**Answer:** A route guard controls whether navigation to or from a route is allowed.

**Advanced: Can route guards protect an application from unauthorized access?**

**Answer:** They can prevent unauthorized navigation in the client application, but they are not a security boundary. The backend must still validate authentication and authorization for protected APIs.

**Advanced: What is a route resolver?**

**Answer:** A resolver loads required data before activating a route, allowing the component to receive that data when it is initialized.

---

**### 🟡 15.24 Routing Follow-up Questions**

1. What is the difference between `CanActivate` and `CanActivateChild`?
2. When would you use `CanDeactivate`?
3. What is lazy loading?
4. What is the difference between `loadComponent` and `loadChildren`?
5. What is `ActivatedRoute`?
6. How do you read route parameters?
7. How do you read query parameters?
8. What is a wildcard route?
9. Why should `**` normally be last?
10. What is a route resolver?
11. What are router events?
12. How would you implement an authentication guard?
13. Are route guards enough to secure an application?
14. How would you redirect an unauthenticated user to login?
15. How would you protect all child routes?
16. How would you implement an unsaved-changes warning?
17. How does lazy loading improve performance?
18. What happens during Angular navigation?
19. How would you debug a route that is not loading?
20. What is the difference between route data and query parameters?

---

**### Key Takeaways: Routing**

✅ **Router** → Handles navigation
✅ **RouterOutlet** → Where routed components are displayed
✅ **routerLink** → Template navigation
✅ **Router.navigate()** → Programmatic navigation
✅ **ActivatedRoute** → Access current route information
✅ **Route parameters** → `/users/:id`
✅ **Query parameters** → `/users?page=2`
✅ **Child routes** → Nested routing
✅ **Lazy loading** → Load features when needed
✅ **CanActivate** → Control route access
✅ **CanActivateChild** → Protect child routes
✅ **CanDeactivate** → Control leaving a route
✅ **Resolver** → Load data before route activation
✅ **Router events** → Track/debug navigation
✅ **Wildcard route** → Handle unknown URLs
✅ **Route guards are not backend security** → Backend must enforce authorization

## 16. HTTP and API Integration

### 🟢 16.1 What is HttpClient?

Angular's `HttpClient` is used to communicate with backend APIs over HTTP.

It supports:

- GET
- POST
- PUT
- PATCH
- DELETE
- HTTP headers
- Query parameters
- Interceptors
- Error handling
- Typed responses

Example:

```typescript id="8n9v2r"
import { HttpClient } from '@angular/common/http';

constructor(private http: HttpClient) {}

getUsers() {
  return this.http.get<User[]>('/api/users');
}
```

`HttpClient` returns an **Observable**.

```text id="6h6q9e"
Angular
   ↓
HttpClient
   ↓
HTTP Request
   ↓
Backend API
   ↓
HTTP Response
   ↓
Observable
```

---

**### 🟢 16.2 Configuring HttpClient**

Modern Angular applications commonly use `provideHttpClient()`.

```typescript id="wz4huj"
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
});
```

In older NgModule-based applications:

```typescript id="4dq1f4"
@NgModule({
  imports: [HttpClientModule],
})
export class AppModule {}
```

---

**### 🟢 16.3 GET Request**

Used to retrieve data.

```typescript id="k6x9z0"
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}
```

With an ID:

```typescript id="f4hx8v"
getUser(id: number): Observable<User> {
  return this.http.get<User>(`/api/users/${id}`);
}
```

---

**### 🟢 16.4 POST Request**

Used to create data.

```typescript id="9o0j3r"
createUser(user: User): Observable<User> {
  return this.http.post<User>(
    '/api/users',
    user
  );
}
```

The second argument is the request body.

---

**### 🟢 16.5 PUT vs PATCH**

### PUT

Usually replaces the complete resource.

```typescript id="5jlh7d"
updateUser(user: User) {
  return this.http.put<User>(
    `/api/users/${user.id}`,
    user
  );
}
```

### PATCH

Usually updates only selected fields.

```typescript id="8t0qz8"
updateUserName(id: number, name: string) {
  return this.http.patch<User>(
    `/api/users/${id}`,
    { name }
  );
}
```

**Interview Rule:**

```text id="u6c9d8"
PUT   → Full update/replacement
PATCH → Partial update
```

---

**### 🟢 16.6 DELETE Request**

Used to delete a resource.

```typescript id="7h8r3m"
deleteUser(id: number) {
  return this.http.delete<void>(
    `/api/users/${id}`
  );
}
```

---

**### 🟢 16.7 HttpParams**

`HttpParams` is used to send query parameters.

Example:

```text id="4z8c9h"
/api/users?page=2&size=10
```

Angular:

```typescript id="9j7l1k"
const params = new HttpParams().set("page", 2).set("size", 10);

return this.http.get<User[]>("/api/users", { params });
```

Useful for:

- Pagination
- Filtering
- Searching
- Sorting

---

**### 🟢 16.8 HttpHeaders**

HTTP headers provide additional information with a request.

```typescript id="z1s6n4"
const headers = new HttpHeaders({
  "Content-Type": "application/json",
});

return this.http.get("/api/users", {
  headers,
});
```

Common headers:

```text id="6k6j9j"
Content-Type
Authorization
Accept
```

---

**### 🟢 16.9 Typed HTTP Responses**

TypeScript interfaces can be used to describe API responses.

```typescript id="u7q5qf"
interface User {
  id: number;
  name: string;
  email: string;
}
```

Then:

```typescript id="0j2b1r"
getUsers(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}
```

This provides compile-time type checking and better IDE support.

**Important:** Type parameters do not validate the actual server response at runtime. They tell TypeScript what shape the application expects.

---

**### 🟢 16.10 Handling HTTP Errors**

Use `catchError()` to handle errors.

```typescript id="k5s6zn"
getUsers() {
  return this.http.get<User[]>('/api/users').pipe(
    catchError(error => {
      console.error('API error:', error);
      return of([]);
    })
  );
}
```

HTTP errors can include:

```text id="h2u9cm"
400 → Bad Request
401 → Unauthorized
403 → Forbidden
404 → Not Found
500 → Server Error
```

---

**### 🟢 16.11 HTTP Interceptors**

Interceptors allow us to process HTTP requests and responses globally.

Common uses:

- Adding authentication tokens
- Logging requests
- Global error handling
- Adding headers
- Showing/hiding loaders

Modern Angular supports functional interceptors.

```typescript id="z9t4qx"
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(request);
};
```

Register it:

```typescript id="z4v0jo"
provideHttpClient(withInterceptors([authInterceptor]));
```

---

**### 🟢 16.12 Why clone an HttpRequest?**

Angular's `HttpRequest` is immutable.

Therefore, instead of:

```typescript id="4sk6r8"
// ❌ Cannot directly modify the request
req.headers.set(...)
```

create a modified copy:

```typescript id="g9e7h1"
const newRequest = req.clone({
  setHeaders: {
    Authorization: `Bearer ${token}`,
  },
});
```

**Interview Point:**

> HTTP requests and responses in Angular are immutable, so interceptors use `clone()` to modify requests.

---

**### 🟢 16.13 JWT Authentication with HttpClient**

A common Angular + backend flow is:

```text id="k5zq8g"
Login
  ↓
Backend validates credentials
  ↓
Backend returns JWT
  ↓
Angular stores token
  ↓
HTTP Interceptor adds token
  ↓
Backend validates token
  ↓
API response
```

Interceptor:

```typescript id="y1d8j5"
const token = authService.getToken();

const request = req.clone({
  setHeaders: {
    Authorization: `Bearer ${token}`,
  },
});
```

**Important:** Token storage has security trade-offs. Avoid treating browser storage as inherently secure, and design authentication according to the application's threat model.

---

**### 🟡 16.14 CORS**

CORS (Cross-Origin Resource Sharing) is a browser security mechanism controlling whether a frontend from one origin can access resources from another origin.

Example:

```text id="r1v2n4"
Angular
http://localhost:4200

        ↓

Spring Boot
http://localhost:8080
```

These are different origins.

The backend must allow the required origin.

**Important:**

CORS is primarily enforced by the browser. Angular does not "fix" CORS.

---

**### 🟡 16.15 File Upload**

Angular can send files using `FormData`.

```typescript id="6b5j5f"
const formData = new FormData();

formData.append("file", file);

return this.http.post("/api/upload", formData);
```

Do not manually set `Content-Type: multipart/form-data` in this case. The browser needs to set the appropriate boundary.

---

**### 🟡 16.16 HTTP Request Cancellation**

Angular HTTP requests can be cancelled by unsubscribing from the Observable.

For example, `switchMap()` automatically unsubscribes from the previous inner Observable:

```typescript id="0i7w6x"
searchControl.valueChanges.pipe(
  debounceTime(300),
  switchMap((query) =>
    this.http.get("/api/search", {
      params: { q: query },
    }),
  ),
);
```

This is useful for search/autocomplete functionality.

---

**### 🟡 16.17 API Service Architecture**

A good Angular application generally keeps HTTP communication inside services rather than directly inside every component.

```text id="3l5d3z"
Component
    ↓
UserService
    ↓
HttpClient
    ↓
Backend API
```

Example:

```typescript id="1c0o2e"
@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>("/api/users");
  }

  createUser(user: User) {
    return this.http.post<User>("/api/users", user);
  }
}
```

The component then consumes the service:

```typescript id="q7y4qv"
users$ = this.userService.getUsers();
```

Benefits:

- Separation of concerns
- Reusability
- Easier testing
- Cleaner components
- Centralized API logic

---

**### 🟢 16.18 HTTP Interview Questions**

**Beginner: What is HttpClient?**

**Answer:** `HttpClient` is Angular's service for communicating with backend APIs over HTTP.

**Beginner: What does HttpClient return?**

**Answer:** It returns Observables.

**Intermediate: What is an HTTP interceptor?**

**Answer:** An interceptor allows HTTP requests and responses to be processed globally, such as adding authentication headers or handling errors.

**Intermediate: Why do we use `HttpParams`?**

**Answer:** `HttpParams` is used to construct query parameters for HTTP requests.

**Intermediate: Why do we use `req.clone()` in an interceptor?**

**Answer:** Angular HTTP requests are immutable, so `clone()` creates a modified copy of the request.

**Advanced: How would you add a JWT to every API request?**

**Answer:** Use an HTTP interceptor to retrieve the token and add it to the `Authorization` header.

**Advanced: Is CORS an Angular problem?**

**Answer:** No. CORS is a browser security mechanism and must generally be configured on the backend/server to allow the required origin.

---

**### 🟡 16.19 HTTP Follow-up Questions**

1. What is the difference between PUT and PATCH?
2. What is the difference between HttpParams and HttpHeaders?
3. Why is HttpRequest immutable?
4. Why does HttpClient return Observables?
5. How do you handle global API errors?
6. How do you add JWT authentication to requests?
7. What is an HTTP interceptor?
8. Can you have multiple interceptors?
9. How do you cancel an HTTP request?
10. How would you implement file upload?
11. What is CORS?
12. How would you implement pagination?
13. How would you handle a 401 response?
14. How would you retry failed requests?
15. How would you prevent duplicate API requests?

---

**### Key Takeaways: HTTP**

✅ **HttpClient** → Communicates with backend APIs
✅ **GET** → Retrieve data
✅ **POST** → Create data
✅ **PUT** → Replace/update resource
✅ **PATCH** → Partial update
✅ **DELETE** → Delete resource
✅ **HttpParams** → Query parameters
✅ **HttpHeaders** → HTTP headers
✅ **Interceptors** → Global request/response processing
✅ **clone()** → Modify immutable HTTP requests
✅ **HttpClient returns Observables**
✅ **Services** → Keep API logic separate from components
✅ **CORS** → Browser security mechanism, usually configured on backend

---

## 17. State Management

### 🟢 17.1 What is State Management?

State is data that an application needs to remember and use.

Examples:

- Logged-in user
- Shopping cart
- Selected filters
- UI settings
- Loading state
- Application data

State management is the process of **storing, updating, and sharing this state**.

```text id="x8n2c6"
Component
    ↓
State
    ↓
Other Components
```

---

**### 🟢 17.2 Local Component State**

The simplest form of state is state stored directly inside a component.

```typescript id="g0h7j3"
@Component({...})
export class CounterComponent {

  count = 0;

  increment() {
    this.count++;
  }
}
```

Use local state when the data is only relevant to one component.

Examples:

- Modal open/closed
- Selected tab
- Input value
- Local loading state

---

**### 🟢 17.3 Shared State Using a Service**

When multiple components need the same state, a service can hold it.

```typescript id="6h1h4d"
@Injectable({
  providedIn: "root",
})
export class UserStateService {
  private userSubject = new BehaviorSubject<User | null>(null);

  user$ = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }
}
```

Components can subscribe to the state:

```typescript id="ys7a4h"
user$ = this.userState.user$;
```

This is suitable for relatively simple shared state.

---

**### 🟢 17.4 BehaviorSubject for State**

A common older/simple Angular pattern is:

```typescript id="e4z1d7"
private userSubject =
  new BehaviorSubject<User | null>(null);

user$ = this.userSubject.asObservable();
```

Update:

```typescript id="9o9x2d"
this.userSubject.next(user);
```

Read:

```typescript id="s4b2u6"
user$ = this.userState.user$;
```

`BehaviorSubject` is useful because new subscribers immediately receive the current value.

---

**### 🟢 17.5 Signals for State**

Modern Angular provides Signals for reactive state.

```typescript id="q9z0x1"
count = signal(0);

increment() {
  this.count.update(value => value + 1);
}
```

Template:

```html id="3l8n7g"
<p>{{ count() }}</p>
```

Derived state can use `computed()`:

```typescript id="w2m4e8"
count = signal(10);

doubleCount = computed(() => this.count() * 2);
```

Signals are often a good choice for local component state and simpler shared state.

---

**### 🟢 17.6 Signals vs BehaviorSubject**

| Signals                            | BehaviorSubject                          |
| ---------------------------------- | ---------------------------------------- |
| Modern Angular reactive primitive  | RxJS state pattern                       |
| Simple synchronous state           | Observable-based state                   |
| Read with `signal()`               | Read through subscription                |
| `computed()` for derived state     | RxJS operators                           |
| Great for component state          | Useful for Observable-heavy applications |
| Integrates with Angular reactivity | Integrates naturally with RxJS           |

Neither is universally better.

Choose based on the problem.

---

**### 🟡 17.7 When Do You Need Global State?**

Not every application needs a global state-management library.

For a small application:

```text id="2z3j8x"
Component
   ↓
Service
   ↓
API
```

may be enough.

For a larger application:

```text id="a1m6o9"
Many Components
       ↓
Shared State
       ↓
Actions / Updates
       ↓
Central Store
```

may be useful.

Use global state management when:

- Many unrelated components share state
- State updates are complex
- State needs predictable transitions
- Debugging state changes is difficult
- Multiple features depend on the same state

---

**### 🟡 17.8 NgRx**

NgRx is a popular state-management library for Angular based on Redux-style principles.

Main concepts:

```text id="v5f7e1"
Component
    ↓
Action
    ↓
Reducer
    ↓
Store
    ↓
Selector
    ↓
Component
```

For asynchronous operations:

```text id="c7f2y1"
Component
    ↓
Action
    ↓
Effect
    ↓
API
    ↓
Success/Failure Action
    ↓
Reducer
    ↓
Store
```

---

**### 🟡 17.9 NgRx Actions**

Actions describe something that happened.

```typescript id="8p8p4s"
export const loadUsers = createAction("[Users] Load Users");

export const loadUsersSuccess = createAction(
  "[Users] Load Users Success",
  props<{ users: User[] }>(),
);
```

Actions should describe events rather than directly modifying state.

---

**### 🟡 17.10 NgRx Reducers**

Reducers calculate the next state from the current state and an action.

```typescript id="5s9s7v"
export interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const userReducer = createReducer(
  initialState,

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
  })),
);
```

Reducers should be:

- Predictable
- Pure
- Free from side effects

---

**### 🟡 17.11 NgRx Selectors**

Selectors retrieve specific parts of the state.

```typescript id="q1v5e8"
export const selectUsers = createSelector(
  selectUserState,
  (state) => state.users,
);
```

Component:

```typescript id="y6s8k4"
users$ = this.store.select(selectUsers);
```

Selectors help components consume only the state they need.

---

**### 🟡 17.12 NgRx Effects**

Effects handle side effects such as HTTP calls.

```typescript id="b9p7d1"
loadUsers$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadUsers),
    switchMap(() =>
      this.userService.getUsers().pipe(
        map((users) => loadUsersSuccess({ users })),
        catchError((error) => of(loadUsersFailure({ error }))),
      ),
    ),
  ),
);
```

The effect:

```text id="r7d2s4"
Action
  ↓
Effect
  ↓
API
  ↓
Success/Failure Action
```

---

**### 🟡 17.13 When Should You Use NgRx?**

NgRx can be useful when:

- Application state is large
- Many features share state
- State transitions are complex
- Multiple asynchronous operations depend on shared state
- Predictable state updates are important
- The team is comfortable with the architecture

Avoid introducing NgRx simply because the application uses Angular.

For small applications, it can add unnecessary complexity.

---

**### 🟡 17.14 State Management Approaches**

| Approach          | Best For                       |
| ----------------- | ------------------------------ |
| Component state   | Local UI state                 |
| Service + Signals | Simple shared state            |
| BehaviorSubject   | Observable-based shared state  |
| Signals           | Modern Angular state           |
| NgRx              | Complex application-wide state |

---

**### 🟢 17.15 State Management Interview Questions**

**Beginner: What is state management?**

**Answer:** State management is the process of storing, updating, and sharing application data in a predictable way.

**Intermediate: How can components share state?**

**Answer:** Components can share state through services, Signals, RxJS subjects, or a dedicated state-management library such as NgRx.

**Intermediate: Why is BehaviorSubject commonly used for state?**

**Answer:** It stores the latest value and immediately provides that value to new subscribers.

**Intermediate: Signals vs BehaviorSubject?**

**Answer:** Signals are Angular's modern reactive primitive and are well suited to synchronous state, while BehaviorSubject is an RxJS-based approach that works naturally with Observable streams.

**Advanced: When would you use NgRx?**

**Answer:** NgRx is useful when application state is large or complex, shared across many features, and benefits from predictable state transitions and centralized management. It is unnecessary overhead for many simple applications.

**Advanced: What is the difference between an NgRx reducer and an effect?**

**Answer:** A reducer calculates state changes from actions and should be pure. An effect handles side effects such as HTTP calls and dispatches new actions based on their results.

---

**### 🟡 17.16 State Management Follow-up Questions**

1. What is local state?
2. What is global state?
3. When should state be stored in a service?
4. Signals vs RxJS?
5. BehaviorSubject vs Signal?
6. When would you introduce NgRx?
7. What is an NgRx Action?
8. What is a Reducer?
9. What is a Selector?
10. What is an Effect?
11. Why should reducers be pure?
12. Where should API calls happen in NgRx?
13. What is the difference between client state and server state?
14. How would you avoid unnecessary global state?
15. How would you structure state for a large Angular application?

---

**### Key Takeaways: State Management**

✅ **Local state** → State used by one component
✅ **Service state** → Simple shared state
✅ **BehaviorSubject** → Observable-based state
✅ **Signals** → Modern Angular state
✅ **NgRx** → Complex application-wide state
✅ **Action** → Describes an event
✅ **Reducer** → Calculates new state
✅ **Selector** → Reads state
✅ **Effect** → Handles side effects
✅ **Don't use NgRx unnecessarily** → Choose the simplest solution that works

---

## 18. Angular Modules & Architecture

### 🟢 18.1 What is an Angular Module?

An Angular `NgModule` is a mechanism used by older Angular applications to organize components, directives, pipes, and providers.

Example:

```typescript id="5l4j8s"
@NgModule({
  declarations: [UserComponent],

  imports: [CommonModule],

  exports: [UserComponent],
})
export class UserModule {}
```

However, modern Angular applications can use **Standalone Components** instead of NgModules.

---

**### 🟢 18.2 NgModule Metadata**

Important NgModule properties:

| Property       | Purpose                                           |
| -------------- | ------------------------------------------------- |
| `declarations` | Components, directives, pipes owned by module     |
| `imports`      | Other modules/standalone dependencies             |
| `exports`      | Makes declarations available to importing modules |
| `providers`    | Provides services                                 |
| `bootstrap`    | Root components bootstrapped by the module        |

---

**### 🟢 18.3 declarations**

`declarations` defines components, directives, and pipes belonging to an NgModule.

```typescript id="36u8l7"
@NgModule({
  declarations: [UserComponent, UserCardComponent, UserPipe],
})
export class UserModule {}
```

A component should not normally be declared in multiple NgModules.

---

**### 🟢 18.4 imports**

`imports` makes functionality from other modules or standalone components available.

```typescript id="x9h7o5"
@NgModule({
  imports: [CommonModule, FormsModule],
})
export class UserModule {}
```

---

**### 🟢 18.5 exports**

`exports` makes declarations available to modules that import this module.

```typescript id="1v0q4x"
@NgModule({
  declarations: [UserCardComponent],

  exports: [UserCardComponent],
})
export class SharedModule {}
```

Another module can then import `SharedModule` and use `UserCardComponent`.

---

**### 🟡 18.6 providers**

Providers configure dependencies for the Angular DI system.

```typescript id="b9u1g5"
@NgModule({
  providers: [UserService],
})
export class UserModule {}
```

Modern Angular often uses:

```typescript id="z1w8q4"
@Injectable({
  providedIn: "root",
})
export class UserService {}
```

which is generally preferred for application-wide services.

---

**### 🟢 18.7 Standalone Components**

Modern Angular allows components to be standalone.

```typescript id="j5t2x8"
@Component({
  selector: "app-user",
  standalone: true,
  imports: [CommonModule],
  template: ` <p>User</p> `,
})
export class UserComponent {}
```

Standalone components do not need to be declared in an NgModule.

---

**### 🟢 18.8 Standalone vs NgModule**

| Standalone                               | NgModule                                  |
| ---------------------------------------- | ----------------------------------------- |
| Modern Angular approach                  | Older/traditional approach                |
| Component directly declares dependencies | Module groups declarations/dependencies   |
| Less boilerplate                         | More module configuration                 |
| Easier lazy loading                      | Common in existing enterprise apps        |
| Recommended for new applications         | Still important for existing applications |

**Interview Point:**

> Modern Angular favors standalone APIs, but understanding NgModules is still important because many enterprise applications use them.

---

**### 🟢 18.9 Core Module**

In older enterprise Angular applications, a `CoreModule` often contains application-wide singleton services and core functionality.

Example:

```text id="q5d3r7"
core/
 ├── auth/
 ├── interceptors/
 ├── guards/
 └── services/
```

It is typically imported once.

Modern Angular applications often replace much of this structure with root/environment providers and standalone APIs.

---

**### 🟢 18.10 Shared Module**

A `SharedModule` traditionally contains reusable components, directives, and pipes.

Example:

```text id="l7f3v8"
shared/
 ├── components/
 ├── directives/
 └── pipes/
```

It is intended for functionality reused across multiple features.

**Important:** Shared modules should generally not contain application-wide singleton services.

---

**### 🟡 18.11 Feature Modules**

Feature modules organize code around a business feature.

Example:

```text id="0c2x9k"
features/
 ├── users/
 ├── products/
 ├── orders/
 └── reports/
```

For example:

```text id="2h3l4x"
users/
 ├── components/
 ├── services/
 ├── models/
 └── users.routes.ts
```

Feature-based organization is usually easier to maintain than organizing the entire application only by technical type.

---

**### 🟡 18.12 Lazy-loaded Feature Modules**

In older Angular applications, a feature module can be lazy-loaded.

```typescript id="h4g8x2"
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.module')
      .then(m => m.AdminModule)
}
```

Modern Angular commonly uses standalone route files:

```typescript id="k8f1z5"
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
}
```

Both patterns are important when working with different Angular codebases.

---

**### 🟢 18.13 Angular Application Architecture**

A typical enterprise Angular application can be organized like:

```text id="c8w4p6"
src/
 ├── app/
 │    ├── core/
 │    ├── shared/
 │    ├── features/
 │    │    ├── users/
 │    │    ├── products/
 │    │    └── orders/
 │    ├── layout/
 │    └── app.routes.ts
 │
 ├── assets/
 └── environments/
```

### Core

Application-wide functionality.

### Shared

Reusable UI components, directives, and pipes.

### Features

Business functionality.

### Layout

Application shell and common layouts.

---

**### 🟡 18.14 Feature-based vs Layer-based Architecture**

### Layer-based

```text id="2w9c6q"
components/
services/
models/
pipes/
directives/
```

Everything is grouped by technical type.

### Feature-based

```text id="d7r5p2"
users/
  components/
  services/
  models/

orders/
  components/
  services/
  models/
```

Feature-based architecture is often easier to scale because everything related to a business feature is located together.

---

**### 🟡 18.15 Smart vs Presentational Components**

### Smart/Container Component

Responsible for:

- Business logic
- State
- API interaction
- Coordinating child components

### Presentational Component

Responsible mainly for:

- Display
- User interaction
- Receiving inputs
- Emitting outputs

Example:

```text id="0s6c7z"
UserPageComponent
      ↓
UserListComponent
      ↓
UserCardComponent
```

The page component can manage data while the child components focus on presentation.

---

**### 🟡 18.16 Separation of Concerns**

A good Angular application separates responsibilities.

```text id="p8l1j4"
Component
   ↓
UI / user interaction

Service
   ↓
Business/API logic

State
   ↓
Application state

Backend
   ↓
Business/data persistence
```

Avoid putting everything inside components.

For example:

```typescript id="8g2s7c"
// ❌ Too much responsibility
@Component({...})
export class UserComponent {
  // HTTP calls
  // validation
  // business logic
  // state management
  // UI logic
}
```

Instead, separate responsibilities into appropriate services/state layers.

---

**### 🟡 18.17 Reusable Components**

Reusable components should have clear responsibilities and configurable inputs.

```typescript id="4y8f1j"
@Component({
  selector: "app-button",
  template: `
    <button [disabled]="disabled">
      {{ label }}
    </button>
  `,
})
export class ButtonComponent {
  label = input("Submit");

  disabled = input(false);
}
```

A reusable component should avoid depending unnecessarily on a specific feature.

---

**### 🟡 18.18 Angular Architecture Best Practices**

Good practices include:

- Organize around features
- Keep components focused
- Move reusable logic into services
- Avoid large "God" components
- Avoid unnecessary global state
- Use lazy loading for large features
- Use standalone APIs for new applications
- Keep shared functionality genuinely reusable
- Keep API logic in services
- Use appropriate state management
- Avoid unnecessary dependencies between features

---

**### 🟢 18.19 Angular Architecture Interview Questions**

**Beginner: What is an NgModule?**

**Answer:** An NgModule is Angular's traditional mechanism for organizing and grouping components, directives, pipes, providers, and dependencies.

**Intermediate: What is the difference between `declarations` and `imports`?**

**Answer:** `declarations` contains components, directives, and pipes owned by the module, while `imports` makes functionality from other modules or standalone dependencies available.

**Intermediate: What is a SharedModule?**

**Answer:** A SharedModule traditionally contains reusable components, directives, and pipes used across multiple features.

**Intermediate: What is a Feature Module?**

**Answer:** A Feature Module organizes Angular code around a specific business feature, such as users, orders, or products.

**Advanced: Standalone Components vs NgModules?**

**Answer:** Standalone components directly declare their dependencies and are the modern Angular approach. NgModules provide the traditional grouping mechanism and remain important when working with existing enterprise applications.

**Advanced: How would you structure a large Angular application?**

**Answer:** I would generally organize the application around business features, keep shared reusable functionality separate, place application-wide infrastructure in a core area where appropriate, lazy-load large features, and keep components focused while moving API and business logic into services or appropriate state layers.

---

**### 🟡 18.20 Architecture Follow-up Questions**

1. What is the purpose of `declarations`?
2. What is the purpose of `imports`?
3. What is the purpose of `exports`?
4. What is the purpose of `providers`?
5. What is a SharedModule?
6. What is a CoreModule?
7. What is a Feature Module?
8. Why is feature-based architecture useful?
9. What are standalone components?
10. Why did Angular introduce standalone components?
11. Are NgModules obsolete?
12. When would you still use NgModules?
13. What is the difference between smart and presentational components?
14. Where should API calls be placed?
15. How would you structure a large enterprise Angular application?
16. How would you prevent components from becoming too large?
17. When should functionality become a shared component?
18. How would you lazy-load a feature?
19. How would you organize authentication-related code?
20. How would you organize a large Angular project for maintainability?

---

**### Key Takeaways: Angular Modules & Architecture**

✅ **NgModule** → Traditional Angular organization mechanism
✅ **Standalone Components** → Modern Angular approach
✅ **declarations** → Components/directives/pipes owned by module
✅ **imports** → Dependencies used by module
✅ **exports** → Makes declarations available to other modules
✅ **providers** → Dependency injection configuration
✅ **Core** → Application-wide infrastructure
✅ **Shared** → Reusable functionality
✅ **Feature** → Business-specific functionality
✅ **Feature-based architecture** → Scales better for large applications
✅ **Smart component** → Manages data/state/logic
✅ **Presentational component** → Focuses on UI
✅ **Lazy loading** → Loads features when needed
✅ **Separation of concerns** → Keeps applications maintainable

## 19. Lazy Loading & Performance

### 🟢 19.1 What is Lazy Loading?

Lazy loading means loading code **only when it is needed** instead of loading the entire application at startup.

Without lazy loading:

```text
Application starts
      ↓
Load everything
      ↓
Display page
```

With lazy loading:

```text
Application starts
      ↓
Load required code
      ↓
Display page
      ↓
User opens Admin
      ↓
Load Admin code
```

This reduces the initial JavaScript bundle and can improve the initial loading experience.

---

**### 🟢 19.2 Lazy Loading Routes**

Angular supports lazy-loaded routes.

```typescript
export const routes: Routes = [
  {
    path: "admin",
    loadChildren: () =>
      import("./admin/admin.routes").then((m) => m.ADMIN_ROUTES),
  },
];
```

The Admin code is downloaded when the user navigates to `/admin`.

For a standalone component:

```typescript
{
  path: 'reports',
  loadComponent: () =>
    import('./reports/reports.component')
      .then(m => m.ReportsComponent)
}
```

**Common use cases:**

- Admin dashboards
- Reports
- Large feature areas
- Settings
- Features that are not needed immediately

---

**### 🟢 19.3 Why Lazy Loading Improves Performance**

Suppose an application contains:

```text
Home
Users
Products
Reports
Admin
Settings
```

If everything is loaded initially:

```text
Initial Bundle
    ↓
Home + Users + Products + Reports + Admin + Settings
```

With lazy loading:

```text
Initial Bundle
    ↓
Home

Later:
Admin → Admin chunk
Reports → Reports chunk
```

The user does not need to download code for features they never visit.

---

**### 🟢 19.4 Lazy Loading vs Eager Loading**

| Lazy Loading              | Eager Loading                    |
| ------------------------- | -------------------------------- |
| Loads when needed         | Loads immediately                |
| Smaller initial bundle    | Larger initial bundle            |
| Better for large features | Good for small/critical features |
| Can improve initial load  | Simpler configuration            |

**Interview Rule:**

> Lazy load features that are large or not required for the initial page.

---

**### 🟡 19.5 Preloading**

Sometimes we want lazy-loaded features to load in the background after the initial page has loaded.

Conceptually:

```text
Initial page
    ↓
User sees page
    ↓
Browser has free time
    ↓
Load lazy feature
```

This is called **preloading**.

The idea is:

```text
Lazy loading → Don't load immediately
Preloading   → Load later in the background
```

Angular can use routing strategies to control preloading.

---

**### 🟢 19.6 What is Angular Performance?**

Angular performance is mainly about:

- How quickly the application loads
- How quickly it becomes interactive
- How efficiently it updates the UI
- How much JavaScript the browser needs to process

Two important areas are:

```text
Performance
    |
    +── Loading Performance
    |
    +── Runtime Performance
```

---

**### 🟢 19.7 Initial Load Performance**

Initial load is affected by:

- JavaScript bundle size
- Images
- CSS
- API calls
- Rendering
- Third-party libraries

Ways to improve it:

```text
Lazy loading
@defer
Image optimization
SSR
Hydration
Code splitting
Remove unnecessary dependencies
```

---

**### 🟢 19.8 Change Detection and Performance**

Angular uses change detection to keep the UI synchronized with application state.

If too much work happens during change detection, the application can become slow.

Avoid expensive operations directly in templates.

```html
<!-- ❌ Avoid expensive function calls -->
<p>{{ calculateLargeValue() }}</p>
```

Prefer precomputed values:

```typescript
total = calculateLargeValue();
```

or Signals:

```typescript
total = computed(() => price() * quantity());
```

---

**### 🟢 19.9 OnPush Change Detection**

`OnPush` can reduce unnecessary change detection work.

```typescript
@Component({
  selector: "app-user",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <p>{{ user.name }}</p> `,
})
export class UserComponent {
  user = input.required<User>();
}
```

With `OnPush`, Angular can skip checking a component subtree when it has no relevant change.

It works particularly well with:

- Immutable data
- Signals
- Observable + AsyncPipe
- Input changes

---

**### 🟢 19.10 track with @for**

When rendering lists, Angular needs to know which items correspond to which DOM elements.

Use `track`:

```html
@for (user of users; track user.id) {
<p>{{ user.name }}</p>
}
```

Instead of unnecessarily recreating DOM elements, Angular can reuse existing elements when appropriate.

**Best Practice:**

Use a stable unique identifier such as:

```typescript
track user.id
```

---

**### 🟡 19.11 Virtual Scrolling**

If thousands of items need to be displayed, rendering all of them at once can be expensive.

Virtual scrolling renders only the items currently visible.

```text
100,000 items
      ↓
Only visible items rendered
      ↓
User scrolls
      ↓
Different items rendered
```

Angular CDK provides virtual scrolling functionality.

It is useful for:

- Large tables
- Long lists
- Large datasets

---

**### 🟢 19.12 Image Optimization**

Images can have a major impact on application performance.

Good practices:

- Use appropriate image sizes
- Compress images
- Use modern formats where appropriate
- Lazy-load images below the fold
- Prioritize important above-the-fold images

Angular provides `NgOptimizedImage` for image optimization.

---

**### 🟡 19.13 Server-Side Rendering (SSR)**

Normally Angular renders the application in the browser.

With SSR:

```text
Browser
   ↓
Server renders HTML
   ↓
HTML sent to browser
   ↓
Angular becomes interactive
```

Benefits can include:

- Faster initial content display
- Better SEO for appropriate applications
- Better performance for content-heavy pages

---

**### 🟡 19.14 Hydration**

When Angular uses SSR, the server sends already-rendered HTML.

Hydration allows Angular to reuse that HTML and attach the required client-side behavior instead of rebuilding everything from scratch.

```text
Server
 ↓
HTML
 ↓
Browser
 ↓
Hydration
 ↓
Interactive Angular application
```

---

**### 🟡 19.15 @defer for Performance**

`@defer` allows Angular to delay loading the code for components, directives, and pipes until needed.

```html
@defer {
<app-heavy-chart />
}
```

Instead of loading the chart as part of the initial bundle, Angular can load it later.

This can reduce the initial bundle size.

---

**### 🟢 19.16 Measuring Angular Performance**

Do not optimize blindly.

Useful tools include:

- Chrome DevTools
- Angular DevTools
- Browser Performance tools
- Lighthouse
- Angular build output

A good approach is:

```text
Measure
   ↓
Find bottleneck
   ↓
Optimize
   ↓
Measure again
```

**Interview Point:**

> Performance optimization should be based on measurement rather than assumptions.

---

**### 🟢 19.17 Common Angular Performance Techniques**

```text
Lazy loading
     ↓
Reduce initial bundle

@defer
     ↓
Defer heavy UI

OnPush
     ↓
Reduce unnecessary checks

track
     ↓
Reuse DOM elements

Virtual scrolling
     ↓
Render fewer list items

Image optimization
     ↓
Reduce image cost

SSR + Hydration
     ↓
Improve initial rendering

Profiling
     ↓
Find actual bottlenecks
```

---

**### 🟢 19.18 Lazy Loading & Performance Interview Questions**

**Beginner: What is lazy loading?**

**Answer:** Lazy loading loads application code only when it is needed instead of loading everything during the initial application startup.

**Intermediate: Why is lazy loading useful?**

**Answer:** It reduces the initial bundle size and prevents users from downloading code for features they may never use.

**Intermediate: What is the difference between lazy loading and preloading?**

**Answer:** Lazy loading delays loading until the feature is needed, while preloading loads lazy features in the background before the user needs them.

**Intermediate: How does `OnPush` improve performance?**

**Answer:** It allows Angular to skip checking component subtrees when there is no relevant change, reducing unnecessary change detection work.

**Advanced: How would you optimize a slow Angular application?**

**Answer:** First profile the application to identify the bottleneck. Then consider techniques such as lazy loading, `@defer`, `OnPush`, efficient list tracking, virtual scrolling, image optimization, reducing expensive template work, and SSR/hydration where appropriate.

---

**### 🟡 19.19 Performance Follow-up Questions**

1. What is lazy loading?
2. What is preloading?
3. Why should large features be lazy-loaded?
4. What is code splitting?
5. How does `OnPush` improve performance?
6. Why should expensive functions be avoided in templates?
7. Why is `track` important in `@for`?
8. What is virtual scrolling?
9. What is SSR?
10. What is hydration?
11. What is `@defer`?
12. How would you find a performance bottleneck?
13. How can images affect Angular performance?
14. How would you optimize a large table?
15. How would you reduce the initial bundle size?

---

**### Key Takeaways: Lazy Loading & Performance**

✅ **Lazy loading** → Load features when needed
✅ **Preloading** → Load lazy features in the background
✅ **OnPush** → Reduce unnecessary change detection work
✅ **track** → Efficient list rendering
✅ **Virtual scrolling** → Render only visible items
✅ **NgOptimizedImage** → Better image loading
✅ **SSR** → Render HTML on the server
✅ **Hydration** → Make SSR HTML interactive
✅ **@defer** → Defer heavy components/code
✅ **Profiling** → Measure before optimizing

---

## 20. Modern Angular Features

### 🟢 20.1 Standalone Components

Modern Angular allows components to be standalone.

```typescript
@Component({
  selector: "app-user",
  standalone: true,
  imports: [UserCardComponent],
  template: ` <app-user-card /> `,
})
export class UserComponent {}
```

Standalone components don't need to be declared in an NgModule.

Modern Angular applications commonly use standalone APIs.

---

**### 🟢 20.2 New Control Flow**

Modern Angular provides built-in control flow syntax.

Instead of:

```html
<div *ngIf="isLoggedIn">Welcome</div>
```

you can use:

```html
@if (isLoggedIn) {
<div>Welcome</div>
}
```

For loops:

```html
@for (user of users; track user.id) {
<p>{{ user.name }}</p>
}
```

Multiple conditions:

```html
@if (loading) {
<p>Loading...</p>
} @else if (error) {
<p>Error occurred</p>
} @else {
<p>Data loaded</p>
}
```

Switch:

```html
@switch (role) { @case ('admin') {
<p>Admin</p>
} @case ('user') {
<p>User</p>
} @default {
<p>Unknown</p>
} }
```

---

**### 🟢 20.3 Signals**

Signals are Angular's reactive primitive for managing state.

```typescript
count = signal(0);
```

Read the value:

```typescript
console.log(count());
```

Update:

```typescript
count.set(10);
```

or:

```typescript
count.update((value) => value + 1);
```

Template:

```html
<p>{{ count() }}</p>
```

---

**### 🟢 20.4 computed()**

`computed()` creates a value derived from Signals.

```typescript
price = signal(100);
quantity = signal(2);

total = computed(() => price() * quantity());
```

Template:

```html
<p>Total: {{ total() }}</p>
```

When `price` or `quantity` changes, the computed value updates.

**Remember:**

```text
signal()   → Store state
computed() → Derive state
```

---

**### 🟢 20.5 effect()**

`effect()` runs code when the Signals it reads change.

```typescript
count = signal(0);

constructor() {
  effect(() => {
    console.log('Count:', this.count());
  });
}
```

When `count` changes, the effect runs again.

Use effects mainly for side effects such as:

- Logging
- Synchronizing with browser APIs
- Integrating with non-reactive libraries

Do not use `effect()` as the default way to calculate derived state. Use `computed()` for derived values.

---

**### 🟢 20.6 input()**

Modern Angular supports signal-based inputs.

```typescript
@Component({
  selector: "app-user",
})
export class UserComponent {
  user = input.required<User>();
}
```

Read it:

```typescript
console.log(this.user());
```

Template:

```html
<p>{{ user().name }}</p>
```

---

**### 🟢 20.7 output()**

Modern Angular also provides `output()` for component events.

```typescript
@Component({
  selector: "app-button",
})
export class ButtonComponent {
  clicked = output<void>();

  clickButton() {
    this.clicked.emit();
  }
}
```

Parent:

```html
<app-button (clicked)="handleClick()" />
```

---

**### 🟡 20.8 model()**

`model()` supports a writable signal input that can participate in two-way binding.

Example:

```typescript
value = model(0);
```

Parent:

```html
<app-counter [(value)]="count" />
```

This can simplify components that need two-way communication.

---

**### 🟢 20.9 @defer**

`@defer` allows Angular to defer loading code for components, directives, and pipes.

```html
@defer {
<app-heavy-chart />
}
```

The deferred content can be loaded using different triggers.

```html
@defer (on viewport) {
<app-heavy-chart />
}
```

Load when the component enters the viewport.

```html
@defer (on interaction) {
<app-heavy-component />
}
```

Load when the user interacts with the placeholder.

```html
@defer (on timer(2s)) {
<app-recommendations />
}
```

Load after two seconds.

```html
@defer (when showChart) {
<app-chart />
}
```

Load when a condition becomes true.

The default trigger is browser idle time.

---

**### 🟢 20.10 @placeholder, @loading and @error**

`@defer` can provide different UI states.

```html
@defer (on viewport) {
<app-chart />
} @placeholder {
<p>Chart will appear here.</p>
} @loading {
<p>Loading chart...</p>
} @error {
<p>Unable to load chart.</p>
}
```

The flow is:

```text
Placeholder
    ↓
Loading
    ↓
Content

or

Error
```

---

**### 🟡 20.11 @defer Prefetching**

You can start downloading deferred code before the actual render trigger occurs.

```html
@defer ( on interaction; prefetch on idle ) {
<app-heavy-component />
}
```

Meaning:

```text
Browser becomes idle
      ↓
Start downloading code
      ↓
User interacts
      ↓
Component can appear faster
```

This is useful when you expect the user may need the component soon.

---

**### 🟡 20.12 Important @defer Limitation**

For a dependency to be directly deferred, it needs to be standalone and should not be referenced outside the `@defer` block in the same file.

For example:

```html
@defer {
<app-heavy-chart />
}
```

The chart can be split into a separate chunk.

But if the same component is also eagerly referenced elsewhere in that file, Angular may load it eagerly.

**Interview Point:**

> `@defer` is not simply a visual template feature; Angular uses it to split the required code into separately loaded chunks.

---

**### 🟢 20.13 inject()**

Modern Angular allows dependencies to be retrieved using `inject()`.

Traditional constructor injection:

```typescript
constructor(
  private userService: UserService
) {}
```

Using `inject()`:

```typescript
private userService = inject(UserService);
```

This can be useful in:

- Functional guards
- Functional interceptors
- Services
- Components
- Other Angular injection contexts

---

**### 🟢 20.14 takeUntilDestroyed()**

Angular provides `takeUntilDestroyed()` for automatic RxJS cleanup.

```typescript
this.userService
  .getUsers()
  .pipe(takeUntilDestroyed())
  .subscribe((users) => {
    console.log(users);
  });
```

It automatically stops the subscription when the associated Angular destruction context is destroyed.

---

**### 🟡 20.15 Zoneless Angular**

Angular can operate without relying on ZoneJS for change detection.

The idea is:

```text
Traditional approach
Events/async operations
        ↓
ZoneJS
        ↓
Change detection

Zoneless approach
Angular notifications/signals/events
        ↓
Change detection
```

Zoneless applications rely on Angular's supported change-detection notifications.

`OnPush` is also a useful step toward zoneless-compatible components.

**Interview Point:**

You do not need to memorize every internal detail. Understand that zoneless Angular reduces reliance on ZoneJS and lets Angular determine more directly when change detection is needed.

---

**### 🟢 20.16 Modern Angular vs Older Angular**

| Older Angular Patterns                    | Modern Angular               |
| ----------------------------------------- | ---------------------------- |
| NgModules                                 | Standalone components        |
| `*ngIf`                                   | `@if`                        |
| `*ngFor`                                  | `@for`                       |
| Traditional `@Input()`                    | `input()`                    |
| Traditional `@Output()`                   | `output()`                   |
| RxJS/BehaviorSubject for many state cases | Signals for many state cases |
| Constructor injection                     | `inject()` also available    |
| Manual subscription cleanup               | `takeUntilDestroyed()`       |
| Lazy route loading                        | Lazy routes + `@defer`       |
| Zone-based change detection               | Zoneless supported           |

**Important:** Older APIs are not automatically "wrong." You will encounter both modern and older Angular code in real projects.

---

**### 🟢 20.17 Modern Angular Interview Questions**

**Beginner: What are standalone components?**

**Answer:** Standalone components directly declare their dependencies and do not need to be declared inside an NgModule.

**Beginner: What are Angular Signals?**

**Answer:** Signals are Angular's reactive primitive for storing and deriving state while allowing Angular to track where that state is used.

**Intermediate: What is `computed()`?**

**Answer:** `computed()` creates a read-only derived value based on Signals.

**Intermediate: What is `effect()`?**

**Answer:** `effect()` runs side-effect code whenever the Signals it reads change.

**Intermediate: What is `@defer`?**

**Answer:** `@defer` allows Angular to defer loading code for components, directives, and pipes until a specified trigger or condition occurs.

**Intermediate: What is the difference between `@if` and `*ngIf`?**

**Answer:** `@if` is the modern built-in Angular control-flow syntax, while `*ngIf` is the older structural directive approach.

**Advanced: What is the difference between Signals and RxJS?**

**Answer:** Signals are well suited for reactive application state and synchronous derived values, while RxJS is especially useful for asynchronous streams, events, HTTP operations, and complex stream transformations.

**Advanced: What is zoneless Angular?**

**Answer:** Zoneless Angular reduces reliance on ZoneJS by using Angular's own change-detection notifications to determine when views need to be updated.

---

**### 🟡 20.18 Modern Angular Follow-up Questions**

1. What are standalone components?
2. Why were standalone components introduced?
3. Are NgModules still used?
4. What is a Signal?
5. What is `computed()`?
6. What is `effect()`?
7. What is the difference between `signal()` and `computed()`?
8. What is `input()`?
9. What is `output()`?
10. What is `model()`?
11. What is `@if`?
12. What is `@for`?
13. Why should `track` be used with `@for`?
14. What is `@defer`?
15. What are the different `@defer` triggers?
16. What is `@placeholder`?
17. What is `@loading`?
18. What is `@error`?
19. What is `inject()`?
20. What is `takeUntilDestroyed()`?
21. What is zoneless Angular?
22. Signals vs RxJS?
23. `@defer` vs route lazy loading?
24. When should you use `effect()` instead of `computed()`?

---

**### Key Takeaways: Modern Angular**

✅ **Standalone components** → Modern Angular architecture
✅ **Signals** → Reactive state
✅ **computed()** → Derived state
✅ **effect()** → Side effects
✅ **input()** → Signal-based inputs
✅ **output()** → Component events
✅ **model()** → Two-way model binding
✅ **@if** → Modern conditional rendering
✅ **@for** → Modern list rendering
✅ **@switch** → Modern switch control flow
✅ **@defer** → Defer loading of code
✅ **@placeholder** → Content before deferred loading
✅ **@loading** → Loading state
✅ **@error** → Deferred loading error state
✅ **inject()** → Modern dependency injection API
✅ **takeUntilDestroyed()** → Automatic RxJS cleanup
✅ **Zoneless** → Reduced reliance on ZoneJS

---

## 21. Angular Security

### 🟢 21.1 Why is Angular Security Important?

Angular applications run in the browser, so they must protect against attacks such as:

- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF/XSRF)
- Injection attacks
- Unauthorized access
- Insecure data exposure

Angular provides several built-in security features, but **frontend security alone is never enough**.

The backend must also enforce authentication and authorization.

---

**### 🟢 21.2 Cross-Site Scripting (XSS)**

XSS occurs when an attacker manages to execute malicious JavaScript in a user's browser.

Example malicious input:

```html
<script>
  stealUserData();
</script>
```

Angular normally protects against many XSS scenarios by sanitizing and escaping values inserted into the DOM.

For example:

```typescript
username = '<script>alert("XSS")</script>';
```

```html
<p>{{ username }}</p>
```

Angular treats the value as data rather than executable HTML.

---

**### 🟢 21.3 Angular Sanitization**

Angular sanitizes untrusted values when they are inserted into sensitive DOM contexts.

For example:

```html
<div [innerHTML]="userContent"></div>
```

Angular sanitizes potentially dangerous HTML.

**Important:**

Do not assume that every value is automatically safe in every context.

Different DOM contexts have different security risks.

---

**### 🟡 21.4 DomSanitizer**

Angular provides `DomSanitizer` for working with security-sensitive values.

```typescript
constructor(
  private sanitizer: DomSanitizer
) {}
```

For example:

```typescript
safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
```

However, `bypassSecurityTrust...()` is dangerous if used incorrectly.

**Important Rule:**

> Never bypass Angular's security protections just to make an error disappear.

Only mark a value as trusted when you have verified that the value is safe.

---

**### 🟢 21.5 Why Should You Avoid bypassSecurityTrust...?**

This is dangerous:

```typescript
this.sanitizer.bypassSecurityTrustHtml(userInput);
```

If `userInput` contains malicious content, you may have disabled Angular's protection.

Prefer:

```html
<div [innerHTML]="content"></div>
```

and let Angular sanitize untrusted content.

**Interview Question:**

> When should you use `bypassSecurityTrustHtml()`?

**Answer:** Only when you have a strong reason and have independently verified that the content is trusted and safe.

---

**### 🟢 21.6 Authentication vs Authorization**

These are different concepts.

### Authentication

Answers:

> Who are you?

Example:

```text
Login
 ↓
Username + Password
 ↓
Backend validates user
 ↓
User authenticated
```

### Authorization

Answers:

> What are you allowed to do?

Example:

```text
Admin → Can access /admin
User  → Cannot access /admin
```

---

**### 🟢 21.7 Route Guards and Security**

Angular route guards can prevent users from navigating to protected pages.

```typescript
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  return authService.isLoggedIn();
};
```

Route:

```typescript
{
  path: 'dashboard',
  canActivate: [authGuard],
  loadComponent: () =>
    import('./dashboard.component')
      .then(m => m.DashboardComponent)
}
```

But:

> **Route guards are not a security boundary.**

A malicious user can bypass frontend code.

The backend must independently verify:

```text
Authentication
Authorization
Permissions
```

for protected API requests.

---

**### 🟢 21.8 JWT Authentication**

A common architecture is:

```text
Login
 ↓
Backend validates credentials
 ↓
JWT returned
 ↓
Angular uses token
 ↓
Interceptor adds Authorization header
 ↓
Backend validates JWT
 ↓
API response
```

Example:

```typescript
const request = req.clone({
  setHeaders: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

**### 🟡 21.9 Where Should JWT Tokens Be Stored?**

Common browser storage choices include:

```text
localStorage
sessionStorage
Cookies
```

There is no universally safe storage choice for every application.

A major concern is XSS: if JavaScript can access a token, an XSS vulnerability may expose it.

For cookie-based authentication, secure cookie settings such as:

```text
HttpOnly
Secure
SameSite
```

can reduce certain risks.

The correct architecture depends on the authentication model and threat model.

---

**### 🟢 21.10 HttpOnly Cookies**

An `HttpOnly` cookie cannot be read directly by JavaScript.

```text
JavaScript
    ↓
Cannot directly access HttpOnly cookie
```

The browser can still send the cookie with appropriate requests.

This can reduce the risk of token theft through JavaScript-based attacks.

However, cookie-based authentication introduces CSRF considerations, so the overall design must address CSRF as well.

---

**### 🟡 21.11 CSRF / XSRF**

CSRF (Cross-Site Request Forgery) occurs when a malicious site causes a user's browser to make an unwanted authenticated request to another site.

For example:

```text
User logged into bank.com
        ↓
Visits malicious-site.com
        ↓
Malicious site triggers request
        ↓
Browser automatically sends authentication cookie
```

The backend should use appropriate CSRF protections.

Angular's `HttpClient` provides XSRF support for cookie-based authentication patterns when configured appropriately.

---

**### 🟡 21.12 HTTPS**

Always use HTTPS in production.

Without HTTPS:

```text
Browser
   ↓
Network
   ↓
Server
```

Data can potentially be intercepted.

With HTTPS:

```text
Browser
   ↓
Encrypted connection
   ↓
Server
```

HTTPS protects data in transit.

It does not replace authentication or authorization.

---

**### 🟢 21.13 Content Security Policy (CSP)**

CSP is a browser security mechanism that restricts where resources such as scripts can come from.

Conceptually:

```text
CSP
 ↓
Allowed script sources
Allowed styles
Allowed connections
etc.
```

CSP can provide an additional layer of protection against XSS.

It should be configured carefully because an overly strict policy can break application functionality.

---

**### 🟡 21.14 Trusted Types**

Trusted Types is a browser security mechanism that helps prevent dangerous DOM-based injection.

It works particularly well as an additional defense against XSS.

The general idea is:

```text
Untrusted string
      ↓
Trusted transformation
      ↓
DOM
```

Angular recommends considering CSP and Trusted Types as additional security layers for applications.

---

**### 🟢 21.15 Avoiding Unsafe DOM Manipulation**

Avoid directly manipulating the DOM when possible.

Prefer Angular:

```html
<div [textContent]="message"></div>
```

instead of manually inserting HTML with browser APIs.

Be careful with:

```typescript
element.innerHTML = userInput;
```

and similar direct DOM operations.

Angular's template system provides safer abstractions.

---

**### 🟡 21.16 Sensitive Data**

Do not place sensitive information in the frontend bundle.

For example:

```typescript
// ❌ Never put secrets here
const API_SECRET = "my-secret-key";
```

Anything shipped to the browser can potentially be inspected by the user.

Frontend configuration may contain public values such as:

```text
API URL
Environment name
Public configuration
```

but secrets must remain on the server.

---

**### 🟢 21.17 Environment Variables Are Not Automatically Secret**

A common mistake is assuming that putting a secret in an Angular environment file makes it secure.

```typescript
export const environment = {
  apiKey: "SECRET",
};
```

Angular code is shipped to the browser.

Therefore:

> If the browser needs the value, the user can potentially inspect it.

Never store private backend credentials or secret keys in frontend code.

---

**### 🟡 21.18 Dependency Security**

Angular applications depend on many npm packages.

Keep dependencies updated and check for known vulnerabilities.

Useful commands:

```bash
npm audit
```

and:

```bash
npm outdated
```

Do not blindly update production dependencies without testing compatibility.

---

**### 🟢 21.19 Angular Security Best Practices**

```text
Use Angular templates
        ↓
Avoid unsafe DOM manipulation
        ↓
Don't bypass sanitization unnecessarily
        ↓
Use HTTPS
        ↓
Protect APIs on backend
        ↓
Use authentication + authorization
        ↓
Protect against CSRF where applicable
        ↓
Use CSP / Trusted Types where appropriate
        ↓
Keep dependencies updated
```

---

**### 🟢 21.20 Angular Security Interview Questions**

**Beginner: What is XSS?**

**Answer:** XSS is an attack where malicious content is injected into a page and executed in a user's browser.

**Intermediate: How does Angular protect against XSS?**

**Answer:** Angular treats values as untrusted by default and sanitizes or escapes values when inserting them into security-sensitive DOM contexts.

**Intermediate: What is DomSanitizer?**

**Answer:** `DomSanitizer` provides APIs for handling security-sensitive values and, when necessary, explicitly marking trusted values. Bypass methods must be used carefully.

**Intermediate: What is the difference between authentication and authorization?**

**Answer:** Authentication verifies who the user is, while authorization determines what the authenticated user is allowed to access.

**Intermediate: Are Angular route guards enough to secure an application?**

**Answer:** No. Route guards only control client-side navigation. The backend must enforce authentication and authorization.

**Advanced: How would you protect an Angular application from XSS?**

**Answer:** Use Angular's template and sanitization mechanisms, avoid unsafe DOM manipulation, avoid unnecessary `bypassSecurityTrust...()` calls, validate untrusted content, and consider CSP and Trusted Types.

**Advanced: Why shouldn't API secrets be stored in Angular environment files?**

**Answer:** Angular code is delivered to the browser, so anything included in the frontend bundle can potentially be inspected by users. Secrets must remain on the backend.

**Advanced: What is CSRF?**

**Answer:** CSRF is an attack where a malicious site causes a user's browser to send an unwanted authenticated request to another site.

---

**### 🟡 21.21 Security Follow-up Questions**

1. What is XSS?
2. How does Angular prevent XSS?
3. What is sanitization?
4. What is DomSanitizer?
5. Why is `bypassSecurityTrustHtml()` dangerous?
6. What is authentication?
7. What is authorization?
8. Are route guards secure?
9. Why must the backend validate permissions?
10. What is JWT?
11. Where should JWT tokens be stored?
12. What is an HttpOnly cookie?
13. What is CSRF?
14. How does HTTPS protect an application?
15. What is CSP?
16. What are Trusted Types?
17. Why shouldn't API secrets be stored in Angular?
18. How would you protect an Angular application from XSS?
19. How would you secure an admin route?
20. How would you handle a 401 response?
21. What is the difference between XSS and CSRF?
22. How can third-party npm packages create security risks?
23. How would you secure communication between Angular and Spring Boot?
24. What security responsibilities belong to Angular and what belongs to the backend?

---

**### Key Takeaways: Angular Security**

✅ **XSS** → Prevent malicious script injection
✅ **Sanitization** → Angular protects untrusted DOM values
✅ **DomSanitizer** → Handle explicitly trusted security-sensitive values
✅ **Avoid `bypassSecurityTrust...()`** unless absolutely necessary
✅ **Authentication** → Verify user identity
✅ **Authorization** → Verify permissions
✅ **Route guards** → Control client-side navigation, not backend security
✅ **JWT** → Common token-based authentication mechanism
✅ **HttpOnly cookies** → JavaScript cannot directly read them
✅ **CSRF/XSRF** → Protect authenticated cookie-based requests
✅ **HTTPS** → Encrypt data in transit
✅ **CSP** → Additional XSS protection
✅ **Trusted Types** → Additional DOM injection protection
✅ **Never store secrets in frontend code**
✅ **Backend must always enforce security**

## 22. Testing in Angular

### 🟢 22.1 Why is Testing Important?

Testing helps verify that an Angular application behaves correctly.

It helps us:

- Find bugs early
- Prevent regressions
- Safely refactor code
- Verify business logic
- Verify components and services
- Improve application reliability

Common types of tests:

```text id="g0k9x4"
Angular Testing
      |
      +── Unit Testing
      |
      +── Integration Testing
      |
      +── End-to-End Testing
```

---

**### 🟢 22.2 Unit Testing**

Unit testing tests a small piece of code independently.

Examples:

- Service method
- Component method
- Pipe
- Validator

Example:

```typescript id="h8n2m7"
function add(a: number, b: number) {
  return a + b;
}
```

Test:

```typescript id="1q4v7p"
it("should add two numbers", () => {
  expect(add(2, 3)).toBe(5);
});
```

The goal is to test one piece of behavior without depending on the entire application.

---

**### 🟢 22.3 Jasmine and Karma**

Historically, Angular projects commonly used:

```text id="3f5r8k"
Jasmine → Testing framework
Karma   → Test runner
```

Jasmine provides functions such as:

```typescript id="k7q2m5"
describe();
it();
expect();
beforeEach();
```

Karma runs tests in a browser.

Modern Angular projects can use other test runners/frameworks as well, such as Jest or Vitest, depending on the project setup.

**Interview Point:**

> Jasmine is a testing framework, while Karma is a test runner.

---

**### 🟢 22.4 describe(), it(), expect()**

Basic Jasmine structure:

```typescript id="n4w7p2"
describe("Calculator", () => {
  it("should add numbers", () => {
    const result = 2 + 3;

    expect(result).toBe(5);
  });
});
```

Meaning:

```text id="8d2f1c"
describe() → Group tests
it()       → Define a test
expect()   → Check the result
```

---

**### 🟢 22.5 TestBed**

`TestBed` is Angular's main utility for configuring a testing environment.

Example:

```typescript id="x5q8m1"
beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [UserComponent],
  });
});
```

It can provide:

- Components
- Services
- Dependencies
- Providers
- Modules
- Test-specific configuration

---

**### 🟢 22.6 Testing a Component**

Example component:

```typescript id="7m3k9p"
@Component({
  template: `<p>{{ name }}</p>`,
})
export class UserComponent {
  name = "John";
}
```

Test:

```typescript id="j6q1v8"
it("should display the user name", () => {
  const fixture = TestBed.createComponent(UserComponent);

  fixture.detectChanges();

  expect(fixture.nativeElement.textContent).toContain("John");
});
```

---

**### 🟢 22.7 Component Fixture**

`ComponentFixture` provides access to the component and its rendered DOM.

```typescript id="w8n4s2"
const fixture = TestBed.createComponent(UserComponent);
```

Useful properties:

```typescript id="4v9k3m"
fixture.componentInstance;
fixture.nativeElement;
fixture.debugElement;
```

For example:

```typescript id="k5j8x1"
const component = fixture.componentInstance;

component.name = "Alice";

fixture.detectChanges();
```

---

**### 🟢 22.8 detectChanges()**

`detectChanges()` tells Angular to run change detection for the test fixture.

```typescript id="6r2p9w"
component.name = "Alice";

fixture.detectChanges();
```

After this, the DOM reflects the new component state.

Without change detection, the DOM may not yet contain the updated value.

---

**### 🟢 22.9 DebugElement**

`DebugElement` provides Angular-specific access to elements in a test.

```typescript id="q3m7x8"
const debugElement = fixture.debugElement;
```

You can query elements:

```typescript id="v8k1m5"
const button = debugElement.query(By.css("button"));
```

This is useful for interacting with the component's DOM in tests.

---

**### 🟢 22.10 Testing Services**

Suppose we have:

```typescript id="n6p4s9"
@Injectable()
export class CalculatorService {
  add(a: number, b: number) {
    return a + b;
  }
}
```

Test:

```typescript id="j8q2v6"
describe("CalculatorService", () => {
  let service: CalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalculatorService],
    });

    service = TestBed.inject(CalculatorService);
  });

  it("should add numbers", () => {
    expect(service.add(2, 3)).toBe(5);
  });
});
```

---

**### 🟢 22.11 Dependency Injection in Tests**

Suppose:

```typescript id="b7x2m4"
constructor(
  private userService: UserService
) {}
```

The test must provide `UserService`.

```typescript id="p4k9s1"
TestBed.configureTestingModule({
  providers: [UserService],
});
```

Or replace it with a mock:

```typescript id="v2n8c5"
{
  provide: UserService,
  useValue: mockUserService
}
```

---

**### 🟢 22.12 Mocking**

A mock replaces a real dependency with a controlled test version.

Example:

```typescript id="x9m5q3"
const mockUserService = {
  getUser: () =>
    of({
      id: 1,
      name: "John",
    }),
};
```

Then:

```typescript id="s6v8k2"
providers: [
  {
    provide: UserService,
    useValue: mockUserService,
  },
];
```

Benefits:

- Faster tests
- Predictable results
- No real API calls
- Easier failure testing

---

**### 🟢 22.13 HttpTestingController**

Angular provides `HttpTestingController` to test HTTP requests without making real network calls.

```typescript id="k8v3p5"
const req = httpTestingController.expectOne("/api/users");

expect(req.request.method).toBe("GET");

req.flush([{ id: 1, name: "John" }]);
```

This allows you to control the API response.

---

**### 🟢 22.14 Testing HTTP Services**

Example service:

```typescript id="r6m2q9"
getUsers() {
  return this.http.get<User[]>(
    '/api/users'
  );
}
```

Test:

```typescript id="y4p8s1"
service.getUsers().subscribe((users) => {
  expect(users.length).toBe(1);
});

const req = httpTestingController.expectOne("/api/users");

expect(req.request.method).toBe("GET");

req.flush([{ id: 1, name: "John" }]);
```

No actual backend is called.

---

**### 🟢 22.15 Testing Forms**

Reactive forms can be tested directly.

```typescript id="n3k7v5"
it("should require email", () => {
  const email = component.form.get("email");

  email?.setValue("");

  expect(email?.valid).toBeFalse();
});
```

You can test:

- Required validation
- Email validation
- Custom validators
- Form submission
- Form state

---

**### 🟡 22.16 Testing Observables**

RxJS Observables can be tested using normal subscriptions or specialized testing utilities.

Simple example:

```typescript id="m8q4x2"
service.getUsers().subscribe((users) => {
  expect(users.length).toBe(2);
});
```

For complex asynchronous streams, RxJS provides tools such as marble testing.

---

**### 🟡 22.17 Async Testing**

Angular tests may involve asynchronous operations.

Common tools include:

```text id="c4n7p9"
fakeAsync()
tick()
waitForAsync()
```

Example:

```typescript id="v5m2k8"
it("should update after delay", fakeAsync(() => {
  component.start();

  tick(1000);

  expect(component.completed).toBeTrue();
}));
```

`tick()` moves simulated time forward.

---

**### 🟡 22.18 Testing Pipes**

Example pipe:

```typescript id="h2q8m6"
@Pipe({
  name: "uppercase",
})
export class UppercasePipe {
  transform(value: string) {
    return value.toUpperCase();
  }
}
```

Test:

```typescript id="j5v9k3"
it("should convert text to uppercase", () => {
  const pipe = new UppercasePipe();

  expect(pipe.transform("hello")).toBe("HELLO");
});
```

Pipes are often easy to unit test because they are simple transformations.

---

**### 🟡 22.19 What Should You Test?**

Focus on behavior rather than implementation details.

Good things to test:

```text id="f9k2m4"
Component behavior
Service logic
Form validation
User interactions
API handling
Error handling
Important business rules
```

Avoid testing Angular internals that your code does not control.

---

**### 🟢 22.20 Testing Interview Questions**

**Beginner: What is unit testing?**

**Answer:** Unit testing tests a small piece of functionality independently, such as a service method, component method, or pipe.

**Beginner: What is TestBed?**

**Answer:** `TestBed` is Angular's testing utility for configuring a test environment and creating Angular components/services with their dependencies.

**Intermediate: What is ComponentFixture?**

**Answer:** `ComponentFixture` provides access to the component instance and its rendered DOM during testing.

**Intermediate: What is a mock?**

**Answer:** A mock is a replacement for a real dependency that provides controlled behavior during a test.

**Intermediate: How do you test HTTP requests?**

**Answer:** Use `HttpTestingController` to intercept requests and provide controlled responses without making real network calls.

**Advanced: How would you test a component that depends on a service?**

**Answer:** Configure the service in TestBed or replace it with a mock using a provider, then test the component's behavior using the controlled dependency.

---

**### 🟡 22.21 Testing Follow-up Questions**

1. What is TestBed?
2. What is ComponentFixture?
3. What is DebugElement?
4. What does `detectChanges()` do?
5. What is mocking?
6. Why should dependencies be mocked?
7. How do you test an HTTP request?
8. What is HttpTestingController?
9. How do you test reactive forms?
10. How do you test a custom validator?
11. How do you test a pipe?
12. What is `fakeAsync()`?
13. What does `tick()` do?
14. What is `waitForAsync()`?
15. What is an integration test?
16. Unit testing vs integration testing?
17. What should you avoid testing?
18. How would you test an error response from an API?

---

**### Key Takeaways: Testing**

✅ **Unit test** → Test small pieces of code
✅ **TestBed** → Configure Angular testing environment
✅ **Fixture** → Access component and DOM
✅ **detectChanges()** → Run change detection
✅ **Mock** → Replace real dependencies
✅ **HttpTestingController** → Test HTTP requests
✅ **fakeAsync/tick** → Test asynchronous behavior
✅ **Jasmine** → Testing framework
✅ **Karma** → Traditional Angular test runner
✅ **Test behavior** → Avoid unnecessary implementation-detail testing

---

## 23. Angular Build System & Tooling

### 🟢 23.1 What is the Angular CLI?

Angular CLI is the command-line tool used to create, develop, test, build, and maintain Angular applications.

Common commands:

```bash id="2w8p6k"
ng new my-app
ng serve
ng generate component users
ng test
ng build
```

---

**### 🟢 23.2 ng new**

Creates a new Angular application.

```bash id="n5k3q8"
ng new my-app
```

Angular CLI creates the basic project structure.

Typical structure:

```text id="g6v2m1"
my-app/
 ├── src/
 ├── angular.json
 ├── package.json
 ├── tsconfig.json
 └── ...
```

---

**### 🟢 23.3 ng serve**

Starts the development server.

```bash id="w4p7s2"
ng serve
```

The application is compiled and served locally.

You can also specify a port:

```bash id="q9m2x5"
ng serve --port 4201
```

---

**### 🟢 23.4 ng generate**

Generates Angular code.

Component:

```bash id="j8v4n6"
ng generate component users
```

Short form:

```bash id="p3x7m1"
ng g c users
```

Other examples:

```bash id="n2k6s8"
ng g service user
ng g guard auth
ng g pipe currency
```

---

**### 🟢 23.5 ng build**

Builds the Angular application.

```bash id="r5q8v2"
ng build
```

For production:

```bash id="k1m7p4"
ng build --configuration production
```

The build produces optimized browser assets.

---

**### 🟢 23.6 Development vs Production Build**

Development builds prioritize developer experience.

Production builds prioritize:

- Smaller bundles
- Optimization
- Better performance
- Deployment

Conceptually:

```text id="m8s3v6"
Development
   ↓
Fast rebuild/debugging

Production
   ↓
Optimization/minification
   ↓
Smaller output
```

---

**### 🟢 23.7 Angular Build Output**

A production build typically produces files such as:

```text id="q7n2k5"
index.html
main.js
styles.css
polyfills.js
chunk files
assets
```

The exact output depends on the Angular version and build configuration.

---

**### 🟡 23.8 AOT Compilation**

AOT means:

> Ahead-of-Time compilation.

Angular templates are compiled during the build process rather than waiting until the browser runs the application.

```text id="z8p4m2"
Angular Source
     ↓
AOT Compilation
     ↓
Browser JavaScript
```

Benefits:

- Faster startup
- Smaller runtime work
- Earlier template errors
- Better production optimization

Modern Angular production builds use AOT by default.

---

**### 🟢 23.9 JIT vs AOT**

### JIT

Just-in-Time compilation happens at runtime.

```text id="f4n8q1"
Browser
 ↓
Compile Angular
 ↓
Run application
```

### AOT

Ahead-of-Time compilation happens during build time.

```text id="x6m2s9"
Build
 ↓
Compile Angular
 ↓
Browser receives compiled output
```

| JIT                                      | AOT                      |
| ---------------------------------------- | ------------------------ |
| Runtime compilation                      | Build-time compilation   |
| Useful during some development scenarios | Standard for production  |
| More runtime work                        | Less runtime compilation |

---

**### 🟡 23.10 Tree Shaking**

Tree shaking removes unused code from the final bundle.

Example:

```typescript id="k3q8v5"
import { usedFunction } from "library";
```

If other library functionality is never used, a modern build pipeline may remove it from the production bundle when the library/build supports tree shaking.

Result:

```text id="s8v1n4"
Less unused JavaScript
        ↓
Smaller bundle
        ↓
Faster loading
```

---

**### 🟡 23.11 Code Splitting**

Code splitting divides the application into smaller JavaScript chunks.

```text id="j5m7q2"
Application
    |
    +── main chunk
    |
    +── admin chunk
    |
    +── reports chunk
    |
    +── other chunks
```

Lazy loading and `@defer` can create opportunities for separate chunks.

---

**### 🟢 23.12 Source Maps**

Source maps help developers debug compiled JavaScript by mapping it back to the original TypeScript source.

Without source maps:

```text id="f3q7w1"
Browser
 ↓
Compiled JavaScript
```

With source maps:

```text id="r8m2k5"
Browser error
 ↓
Source map
 ↓
Original TypeScript
```

This is especially useful during development.

---

**### 🟢 23.13 angular.json**

`angular.json` contains Angular CLI workspace configuration.

It can define:

- Build settings
- Serve configuration
- Test configuration
- Assets
- Styles
- Scripts
- Configurations

Example:

```json id="w7x2n4"
{
  "projects": {
    "my-app": {
      "architect": {
        "build": {},
        "serve": {},
        "test": {}
      }
    }
  }
}
```

The exact structure can vary between Angular versions and builders.

---

**### 🟢 23.14 package.json**

`package.json` defines project metadata, scripts, and dependencies.

Example:

```json id="q4m8s1"
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  }
}
```

Dependencies include packages such as:

```text id="y2v6k9"
@angular/core
@angular/common
rxjs
typescript
```

---

**### 🟢 23.15 TypeScript Configuration**

Angular projects use TypeScript configuration files.

Common files include:

```text id="p8n3v5"
tsconfig.json
tsconfig.app.json
tsconfig.spec.json
```

They control TypeScript compiler settings for different parts of the application.

---

**### 🟡 23.16 Environment Configuration**

Applications often need different configuration for development and production.

For example:

```typescript id="n6x1q8"
export const environment = {
  production: false,
  apiUrl: "http://localhost:8080/api",
};
```

Production can have a different configuration.

```typescript id="j4m9s2"
export const environment = {
  production: true,
  apiUrl: "https://api.example.com",
};
```

**Important:**

Environment configuration is **not a secure storage mechanism**. Values shipped to the browser can be inspected.

---

**### 🟢 23.17 npm vs npx vs ng**

### npm

Package manager:

```bash id="c8v2k6"
npm install
npm install rxjs
```

### npx

Runs a package command without requiring a global installation:

```bash id="x5m1p9"
npx some-command
```

### ng

Angular CLI command:

```bash id="q7r3n8"
ng serve
ng build
ng generate
```

---

**### 🟡 23.18 Angular Compiler and Build System**

The Angular build process roughly looks like:

```text id="w6k2m5"
TypeScript
    ↓
Angular Compiler
    ↓
Bundling
    ↓
Optimization
    ↓
Code Splitting
    ↓
Output files
```

Modern Angular uses a newer build system based on the Angular CLI's current application builder rather than the older Webpack-only architecture.

**Interview Point:**

You should understand the purpose of the build system rather than memorize its internal implementation details.

---

**### 🟢 23.19 Angular CLI Interview Questions**

**Beginner: What is Angular CLI?**

**Answer:** Angular CLI is the command-line tool used to create, develop, generate, test, build, and maintain Angular applications.

**Beginner: What does `ng serve` do?**

**Answer:** It starts a development server and serves the Angular application locally.

**Intermediate: What does `ng build` do?**

**Answer:** It compiles and bundles the application into deployable browser assets.

**Intermediate: What is AOT?**

**Answer:** AOT compiles Angular templates during the build process instead of compiling them in the browser at runtime.

**Intermediate: What is tree shaking?**

**Answer:** Tree shaking removes unused code from the production bundle to reduce its size.

**Advanced: What is code splitting?**

**Answer:** Code splitting divides an application into smaller chunks that can be loaded separately, often through lazy loading or deferred loading.

**Advanced: What is the difference between development and production builds?**

**Answer:** Development builds prioritize debugging and fast development, while production builds apply optimizations to produce efficient deployable assets.

---

**### 🟡 23.20 Build & Tooling Follow-up Questions**

1. What does `ng new` do?
2. What does `ng serve` do?
3. What does `ng build` do?
4. What does `ng generate` do?
5. What is AOT?
6. What is JIT?
7. AOT vs JIT?
8. What is tree shaking?
9. What is code splitting?
10. What are source maps?
11. What is angular.json?
12. What is package.json?
13. What is tsconfig.json?
14. What is the difference between npm and npx?
15. What happens during an Angular production build?
16. How would you reduce bundle size?
17. How does lazy loading affect the build?
18. How does `@defer` affect the build?
19. What is an Angular builder?
20. How would you troubleshoot a failed production build?

---

**### Key Takeaways: Build System & Tooling**

✅ **Angular CLI** → Angular development tool
✅ **ng serve** → Development server
✅ **ng generate** → Generate Angular code
✅ **ng build** → Build application
✅ **AOT** → Build-time compilation
✅ **JIT** → Runtime compilation
✅ **Tree shaking** → Remove unused code
✅ **Code splitting** → Split application into chunks
✅ **Source maps** → Debug compiled code
✅ **angular.json** → CLI/workspace configuration
✅ **package.json** → Dependencies and scripts
✅ **tsconfig** → TypeScript configuration

---

## 24. Angular Internals

### 🟢 24.1 How Angular Works

At a high level:

```text id="j7m3q9"
Angular Application
        ↓
Components
        ↓
Templates
        ↓
Angular Rendering
        ↓
DOM
```

When application state changes:

```text id="p5x8v2"
State changes
     ↓
Angular detects change
     ↓
View updates
```

---

**### 🟢 24.2 Component**

A Component is the basic building block of an Angular application.

```typescript id="n8q4m1"
@Component({
  selector: "app-user",
  template: ` <h2>{{ name }}</h2> `,
})
export class UserComponent {
  name = "John";
}
```

A component contains:

```text id="r6v2k8"
Component
   |
   +── TypeScript class
   +── Template
   +── Styles
   +── Metadata
```

---

**### 🟢 24.3 Component Metadata**

The `@Component()` decorator tells Angular how to treat the class.

```typescript id="c3m9v7"
@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css'
})
```

Common metadata:

```text id="d8x1p5"
selector
template
templateUrl
styles
styleUrl
imports
providers
changeDetection
```

---

**### 🟢 24.4 Angular Template Compilation**

Angular compiles templates into efficient JavaScript instructions.

Conceptually:

```text id="m2q7s4"
HTML Template
     ↓
Angular Compiler
     ↓
Rendering Instructions
     ↓
DOM
```

This is why Angular can update only the parts of the UI that need updating rather than rebuilding the entire page.

---

**### 🟡 24.5 Ivy**

Ivy is Angular's modern rendering and compilation architecture.

It replaced Angular's older View Engine.

Ivy provides:

- Improved compilation
- Better tree shaking
- Smaller bundles
- Better debugging
- More efficient rendering
- Incremental compilation

**Interview Point:**

> Modern Angular applications use Ivy; View Engine is the older Angular rendering engine.

---

**### 🟢 24.6 Change Detection**

Change detection is the process Angular uses to determine whether the view needs to be updated.

Conceptually:

```text id="h7k2m5"
Application state
      ↓
Change detection
      ↓
Check affected views
      ↓
Update DOM
```

Example:

```typescript id="v5q8n2"
name = 'John';

changeName() {
  this.name = 'Alice';
}
```

Angular detects the change and updates:

```html id="r3m6x1"
<p>{{ name }}</p>
```

to:

```text id="s9k4v7"
Alice
```

---

**### 🟢 24.7 Change Detection Tree**

Angular applications form a component tree.

```text id="m6q2v8"
AppComponent
    |
    +── HeaderComponent
    |
    +── DashboardComponent
    |       |
    |       +── ChartComponent
    |       +── UserComponent
    |
    +── FooterComponent
```

Change detection works through this component/view structure.

This is why unnecessarily large or frequently checked component trees can affect performance.

---

**### 🟢 24.8 Default vs OnPush**

Angular supports different change detection strategies.

### Default

Angular checks the component more broadly during change detection.

### OnPush

Angular can skip a component subtree when Angular determines there is no relevant change.

```typescript id="h4n7p2"
@Component({
  changeDetection:
    ChangeDetectionStrategy.OnPush
})
```

`OnPush` works especially well with:

- Immutable inputs
- Signals
- AsyncPipe
- Explicit input changes

---

**### 🟡 24.9 What Triggers OnPush?**

Common triggers include:

- An input value changing according to Angular's input checking
- An event handled in the component/subtree
- A signal used by the template changing
- An Observable used through `AsyncPipe` emitting
- Explicit change detection APIs

For example:

```typescript id="p8m3v6"
user = input.required<User>();
```

When the input changes appropriately, Angular checks the component.

---

**### 🟢 24.10 Dependency Injection Internals**

Angular has a dependency injection system.

Instead of creating dependencies manually:

```typescript id="x5q7m2"
// ❌
const service = new UserService();
```

Angular provides them:

```typescript id="w9k4p1"
constructor(
  private userService: UserService
) {}
```

or:

```typescript id="z2m8v5"
private userService =
  inject(UserService);
```

Conceptually:

```text id="b6v1q9"
Component
    ↓
DI Container
    ↓
UserService instance
```

---

**### 🟢 24.11 Dependency Injection Hierarchy**

Angular's DI system can have different injector scopes.

Conceptually:

```text id="j4p8n2"
Application Injector
       |
       +── Environment/Route Injector
       |
       +── Element/Component Injector
```

A provider can therefore have a different lifetime and visibility depending on where it is provided.

---

**### 🟢 24.12 providedIn: 'root'**

A service declared as:

```typescript id="m8q5r1"
@Injectable({
  providedIn: "root",
})
export class UserService {}
```

is provided through the application-level injector and is typically a singleton within that application injector.

It also allows Angular tooling to tree-shake the service when it is unused.

---

**### 🟡 24.13 Component-level Providers**

You can provide a service at the component level:

```typescript id="f6k2m8"
@Component({
  providers: [
    UserStateService
  ]
})
```

That gives the component's injector its own instance.

This means different component instances can have different service instances.

```text id="q3n7v5"
Component A
    ↓
UserStateService A

Component B
    ↓
UserStateService B
```

---

**### 🟢 24.14 Dependency Injection Resolution**

When Angular needs a dependency, it searches the injector hierarchy for a matching provider.

Conceptually:

```text id="x8m2q6"
Component Injector
      ↓
Parent Injector
      ↓
Environment/Application Injector
      ↓
Provider found
```

This is why the location of a provider matters.

---

**### 🟢 24.15 Lifecycle Hooks**

Angular provides lifecycle hooks that allow code to run at specific stages of a component's life.

Common hooks:

```text id="h2k7m9"
constructor
ngOnChanges
ngOnInit
ngDoCheck
ngAfterContentInit
ngAfterContentChecked
ngAfterViewInit
ngAfterViewChecked
ngOnDestroy
```

Commonly used:

```typescript id="v4q8s1"
ngOnInit() {
  // Initialization
}

ngOnDestroy() {
  // Cleanup
}
```

---

**### 🟢 24.16 Lifecycle Order**

A simplified lifecycle is:

```text id="p6m3x8"
Component creation
       ↓
Input values
       ↓
ngOnChanges
       ↓
ngOnInit
       ↓
Change detection
       ↓
View/content initialization
       ↓
Updates
       ↓
ngOnDestroy
```

The exact sequence depends on what features are used.

---

**### 🟢 24.17 Constructor vs ngOnInit**

### Constructor

Used primarily for:

- Dependency injection
- Basic class initialization

```typescript id="s5q9m2"
constructor(
  private userService: UserService
) {}
```

### ngOnInit

Used for initialization that depends on Angular having initialized the component's inputs.

```typescript id="n8v4k1"
ngOnInit() {
  this.loadUser();
}
```

**Interview Rule:**

> Don't use the constructor for complex initialization or API calls just because it runs early. Use the appropriate lifecycle hook.

---

**### 🟡 24.18 ZoneJS**

Historically, Angular commonly used ZoneJS to detect asynchronous activity and trigger change detection.

Conceptually:

```text id="r4m8v6"
Click / Timer / HTTP
       ↓
ZoneJS notices async activity
       ↓
Angular change detection
       ↓
UI update
```

Modern Angular also supports zoneless applications, reducing this dependency.

---

**### 🟡 24.19 Signals and Change Detection**

Signals provide Angular with precise information about reactive dependencies.

```typescript id="j5q2m8"
count = signal(0);
```

Template:

```html id="d7n4p1"
<p>{{ count() }}</p>
```

When:

```typescript id="f8m3v6"
count.set(10);
```

Angular knows that the template depends on `count` and can schedule the necessary update.

This is one reason Signals are important in modern Angular.

---

**### 🟡 24.20 Angular Rendering**

Angular's rendering system converts component state into DOM updates.

Conceptually:

```text id="q2m7v4"
Component State
      ↓
Template
      ↓
Angular Rendering
      ↓
DOM
```

Angular does not need to recreate the entire DOM for every change.

It updates the relevant DOM nodes.

---

**### 🟡 24.21 Angular Dependency Injection vs Normal JavaScript**

Normal JavaScript:

```typescript id="g6p2v8"
class UserComponent {
  service = new UserService();
}
```

Angular DI:

```typescript id="z4m9q1"
class UserComponent {
  constructor(private service: UserService) {}
}
```

Benefits of DI:

- Loose coupling
- Easier testing
- Dependency replacement
- Centralized configuration
- Lifecycle management

---

**### 🟢 24.22 Angular Internals Interview Questions**

**Beginner: What is change detection?**

**Answer:** Change detection is the process Angular uses to determine when component views need to be updated based on application state.

**Beginner: What is a component?**

**Answer:** A component is a fundamental Angular building block consisting of a class, template, styles, and metadata.

**Intermediate: What is Ivy?**

**Answer:** Ivy is Angular's modern rendering and compilation architecture that provides improved compilation, tree shaking, debugging, and rendering capabilities.

**Intermediate: What is dependency injection?**

**Answer:** Dependency injection is a design pattern where Angular provides required dependencies to classes instead of the classes creating those dependencies themselves.

**Intermediate: Constructor vs ngOnInit?**

**Answer:** The constructor is mainly used for dependency injection and basic initialization, while `ngOnInit` is used for initialization after Angular has initialized the component's inputs.

**Advanced: How does Angular know when a Signal changes?**

**Answer:** Angular tracks Signal reads in reactive contexts such as templates. When a Signal changes, Angular knows which consumers depend on it and can schedule the required view update.

**Advanced: How does OnPush improve performance?**

**Answer:** OnPush allows Angular to skip checking component subtrees when there is no relevant change, reducing unnecessary work.

**Advanced: How does Angular dependency injection resolve a service?**

**Answer:** Angular searches the relevant injector hierarchy for a provider for that dependency and returns the corresponding instance according to the provider's scope.

---

**### 🟡 24.23 Angular Internals Follow-up Questions**

1. What is Angular change detection?
2. How does change detection work?
3. What is Ivy?
4. What was View Engine?
5. What is the Angular component tree?
6. What is the difference between Default and OnPush?
7. What can trigger OnPush change detection?
8. How do Signals interact with change detection?
9. What is ZoneJS?
10. What is zoneless Angular?
11. What is dependency injection?
12. How does Angular resolve dependencies?
13. What is the injector hierarchy?
14. What does `providedIn: 'root'` mean?
15. What happens when a service is provided at component level?
16. Constructor vs ngOnInit?
17. What is the Angular component lifecycle?
18. What happens during component destruction?
19. How does Angular update the DOM?
20. Why is dependency injection useful for testing?
21. Why is OnPush useful in large applications?
22. How do Signals improve Angular reactivity?
23. How would you debug excessive change detection?
24. How would you explain Angular's rendering process?

---

**### Key Takeaways: Angular Internals**

✅ **Component** → Basic Angular building block
✅ **Template** → Defines UI
✅ **Change detection** → Keeps UI synchronized with state
✅ **OnPush** → Reduces unnecessary checking
✅ **Ivy** → Modern Angular rendering/compilation architecture
✅ **DI** → Angular provides dependencies
✅ **Injector hierarchy** → Determines where dependencies are resolved
✅ **providedIn: 'root'** → Application-level service provider
✅ **Component providers** → Can create component-scoped instances
✅ **Lifecycle hooks** → Run code at different component stages
✅ **Signals** → Enable reactive state tracking
✅ **ZoneJS** → Traditional mechanism for detecting async activity
✅ **Zoneless** → Modern approach with less reliance on ZoneJS
✅ **Rendering** → Angular updates the required DOM rather than rebuilding everything

## 25. Debugging & Troubleshooting

### 🟢 25.1 What is Debugging?

Debugging is the process of finding and fixing problems in an application.

A simple debugging process is:

```text
Problem
   ↓
Reproduce it
   ↓
Find the error
   ↓
Identify the root cause
   ↓
Fix it
   ↓
Test again
```

Do not immediately change random code. First understand the actual error.

---

**### 🟢 25.2 Browser Developer Tools**

Chrome DevTools is one of the most important tools for debugging Angular applications.

Useful tabs:

```text
Elements
Console
Network
Sources
Application
Performance
```

### Console

Used for:

- JavaScript errors
- Logs
- Warnings

```typescript
console.log(user);
console.error(error);
```

### Network

Used for:

- API requests
- Request URL
- Request method
- Headers
- Request body
- Response
- HTTP status
- Request timing

---

**### 🟢 25.3 Angular DevTools**

Angular DevTools helps inspect Angular applications.

It can help with:

- Component tree
- Component properties
- Dependency information
- Change detection/performance analysis

It is especially useful when debugging component behavior.

---

**### 🟢 25.4 Reading Angular Errors**

Do not ignore the complete error message.

For example:

```text
NullInjectorError:
No provider for UserService!
```

This tells you that Angular's dependency injection system could not find a provider.

Another example:

```text
ExpressionChangedAfterItHasBeenCheckedError
```

This usually indicates that a value changed at an unexpected point during Angular's checking process.

**Interview Tip:**

> Always identify the error type before changing code.

---

**### 🟢 25.5 Template Errors**

Example:

```html
<p>{{ user.name }}</p>
```

If `user` can initially be `null`, this can cause problems depending on the template and configuration.

Use optional access when appropriate:

```html
<p>{{ user?.name }}</p>
```

Or modern control flow:

```html
@if (user) {
<p>{{ user.name }}</p>
}
```

---

**### 🟢 25.6 Cannot Read Properties of Undefined**

Example:

```text
Cannot read properties of undefined
```

Usually means code is trying to access a property from a value that does not exist yet.

Example:

```typescript
user.name;
```

when:

```typescript
user === undefined;
```

Possible solutions:

```typescript
user?.name;
```

or initialize the object properly.

The important point is to understand **why the value is undefined**, rather than simply hiding the error.

---

**### 🟢 25.7 HTTP 404 Error**

A `404` means the requested resource was not found.

Example:

```text
GET /api/users/10
        ↓
404 Not Found
```

Check:

- API URL
- Endpoint path
- HTTP method
- ID
- Backend route
- Base URL

---

**### 🟢 25.8 HTTP 400 Error**

`400 Bad Request` usually means the server rejected the request because the request data was invalid.

Check:

- Request body
- Required fields
- Data types
- Query parameters
- Validation rules

---

**### 🟢 25.9 HTTP 401 vs 403**

### 401 Unauthorized

Usually means the request does not have valid authentication credentials.

```text
No token
Invalid token
Expired token
```

### 403 Forbidden

Usually means the user is authenticated but does not have permission.

```text
Authenticated
     ↓
Not authorized
     ↓
403
```

**Interview Rule:**

```text
401 → Authentication problem
403 → Authorization problem
```

---

**### 🟢 25.10 HTTP 500 Error**

`500 Internal Server Error` means the server encountered an unexpected error.

If Angular receives:

```text
500 Internal Server Error
```

the problem is generally on the backend/server side.

Check:

- Backend logs
- Database errors
- Server exceptions
- Backend configuration

Angular should still handle the error gracefully.

---

**### 🟢 25.11 CORS Errors**

A common Angular development problem is:

```text
Access to XMLHttpRequest has been blocked by CORS policy
```

Example:

```text
Angular
http://localhost:4200

Spring Boot
http://localhost:8080
```

These are different origins.

The backend must allow the required origin.

**Important:**

CORS is generally a server/browser policy issue, not something Angular can solve by adding random frontend headers.

---

**### 🟢 25.12 API Not Being Called**

If an API does not appear in the Network tab, check:

```text
Component method called?
        ↓
Service method called?
        ↓
Observable subscribed?
        ↓
Request created?
```

For example:

```typescript
this.userService.getUsers().subscribe((users) => {
  console.log(users);
});
```

With HttpClient, the Observable is typically cold, so the request is made when it is subscribed to.

---

**### 🟢 25.13 Observable Not Emitting**

If an Observable is not producing values, check:

- Is it subscribed?
- Is the source emitting?
- Is an operator filtering values?
- Did an error occur?
- Did the Observable complete?
- Is the subscription being cancelled?

Example:

```typescript
this.data$.subscribe({
  next: (data) => console.log(data),
  error: (error) => console.error(error),
  complete: () => console.log("Completed"),
});
```

---

**### 🟡 25.14 Memory Leaks**

Memory leaks can happen when subscriptions, event listeners, timers, or other resources are not cleaned up.

Example:

```typescript
interval(1000).subscribe(...);
```

If the subscription should not continue after the component is destroyed, clean it up.

Modern Angular:

```typescript
this.userService.getUsers().pipe(takeUntilDestroyed()).subscribe();
```

The `AsyncPipe` is another good option:

```html
<p>{{ user$ | async }}</p>
```

It manages the subscription lifecycle automatically.

---

**### 🟡 25.15 Infinite Change Detection Problems**

Be careful with expensive or state-changing functions called directly from templates.

Avoid:

```html
<p>{{ calculateSomething() }}</p>
```

when the function performs expensive work.

Prefer:

```typescript
total = computed(() => price() * quantity());
```

Then:

```html
<p>{{ total() }}</p>
```

---

**### 🟢 25.16 Debugging Forms**

For a reactive form:

```typescript
console.log(this.form.value);
console.log(this.form.valid);
console.log(this.form.errors);
```

For a specific control:

```typescript
const email = this.form.get("email");

console.log(email?.value);
console.log(email?.errors);
console.log(email?.valid);
```

Useful when debugging:

- Validation
- Form values
- Disabled controls
- Submission problems

---

**### 🟡 25.17 Debugging Build Errors**

If the application fails during build:

```text
Build failed
```

Check:

1. The first meaningful error
2. File and line number
3. TypeScript error
4. Missing import
5. Dependency version
6. Angular version compatibility

Avoid focusing only on the last error because later errors can be consequences of the first problem.

---

**### 🟡 25.18 Debugging Dependency Injection Errors**

Example:

```text
NullInjectorError:
No provider for UserService!
```

Check:

```text
Is the service decorated with @Injectable?
Is it provided?
Is providedIn configured?
Is the provider available in this injector?
```

Example:

```typescript
@Injectable({
  providedIn: "root",
})
export class UserService {}
```

---

**### 🟢 25.19 Debugging Checklist**

When something is not working:

```text
1. Reproduce the issue
        ↓
2. Read the error
        ↓
3. Check Console
        ↓
4. Check Network
        ↓
5. Check component state
        ↓
6. Check service/API
        ↓
7. Check backend logs
        ↓
8. Fix root cause
        ↓
9. Test again
```

---

**### 🟢 25.20 Debugging Interview Questions**

**Beginner: How do you debug an Angular application?**

**Answer:** I first reproduce the issue, check the browser console and Network tab, inspect the component state, identify the root cause, fix it, and then verify the behavior again.

**Intermediate: How would you debug an API that is not working?**

**Answer:** I would check whether the request appears in the Network tab, verify the URL, HTTP method, headers, request body, status code, and response. If the request reaches the backend, I would also check backend logs.

**Intermediate: How would you debug a CORS error?**

**Answer:** I would verify the frontend and backend origins and check the backend CORS configuration. CORS is normally solved by correctly configuring the server rather than by changing Angular request data.

**Advanced: How would you debug a slow Angular application?**

**Answer:** I would first profile the application, identify whether the problem is network, rendering, change detection, JavaScript execution, or bundle size, and then optimize the actual bottleneck.

---

**### 🟡 25.21 Debugging Follow-up Questions**

1. How do you debug an API request?
2. What is the Network tab used for?
3. What is a 400 error?
4. 401 vs 403?
5. What does 404 mean?
6. What does 500 mean?
7. How do you debug CORS?
8. How do you debug a memory leak?
9. How do you debug a form?
10. How do you debug an Observable?
11. How do you debug dependency injection?
12. How do you debug a slow component?
13. How do you debug change detection?
14. What would you check if an API is not being called?
15. How do you debug a production build failure?

---

**### Key Takeaways: Debugging**

✅ **Console** → JavaScript/Angular errors
✅ **Network** → API requests and responses
✅ **Angular DevTools** → Component and Angular debugging
✅ **404** → Resource not found
✅ **400** → Invalid request
✅ **401** → Authentication problem
✅ **403** → Authorization problem
✅ **500** → Backend/server error
✅ **CORS** → Check backend configuration
✅ **takeUntilDestroyed()** → Subscription cleanup
✅ **Profile first** → Optimize based on actual bottlenecks

---

## 26. Architecture & Best Practices

### 🟢 26.1 What is Angular Architecture?

Angular architecture defines how application code is organized and how different parts communicate.

A simple architecture:

```text
UI
 ↓
Component
 ↓
Service
 ↓
HTTP/API
 ↓
Backend
 ↓
Database
```

For larger applications:

```text
Features
   ↓
Components
   ↓
Services
   ↓
State Management
   ↓
API
```

The goal is to keep responsibilities separate.

---

**### 🟢 26.2 Separation of Concerns**

Each part of the application should have a clear responsibility.

### Component

Handles:

- UI
- User interaction
- Display state

### Service

Handles:

- API communication
- Reusable business logic
- Shared functionality

### State

Handles:

- Shared application state

### Backend

Handles:

- Security
- Business rules
- Data persistence

Avoid putting everything into one component.

---

**### 🟢 26.3 Keep Components Small**

Avoid components containing:

```text
1000+ lines
Many API calls
Complex business logic
Multiple unrelated responsibilities
```

Instead:

```text
UserPage
   |
   +── UserList
   +── UserCard
   +── UserForm
```

Smaller components are easier to:

- Understand
- Test
- Reuse
- Maintain

---

**### 🟢 26.4 Feature-based Structure**

A scalable application can be organized by business feature.

```text
app/
 ├── core/
 ├── shared/
 ├── features/
 │    ├── users/
 │    │    ├── components/
 │    │    ├── services/
 │    │    └── models/
 │    │
 │    ├── products/
 │    └── orders/
 │
 ├── layout/
 └── app.routes.ts
```

This keeps related code together.

---

**### 🟢 26.5 Core vs Shared vs Feature**

### Core

Application-wide functionality.

Examples:

```text
Authentication
Interceptors
Global services
Guards
```

### Shared

Reusable UI/functionality.

Examples:

```text
Button
Modal
Pipe
Directive
```

### Feature

Business functionality.

Examples:

```text
Users
Orders
Payments
Reports
```

---

**### 🟢 26.6 Smart vs Presentational Components**

### Smart Component

Handles:

- State
- API interaction
- Business coordination

### Presentational Component

Handles:

- Display
- Inputs
- Outputs
- User interaction

Example:

```text
UsersPageComponent
        ↓
UsersListComponent
        ↓
UserCardComponent
```

This can make complex applications easier to manage.

---

**### 🟡 26.7 Avoid Prop Drilling**

Prop drilling happens when data must pass through many unrelated components.

```text
Parent
 ↓
Child
 ↓
Child
 ↓
Child
 ↓
Target Component
```

Possible solutions:

- Shared service
- Signals
- State management
- Better component structure

Do not introduce global state automatically. Use the simplest solution that fits the problem.

---

**### 🟢 26.8 Reusable Components**

A reusable component should have a clear API.

Example:

```typescript
@Component({
  selector: "app-button",
})
export class ButtonComponent {
  label = input("Submit");

  disabled = input(false);

  clicked = output<void>();
}
```

Parent:

```html
<app-button label="Save" (clicked)="save()" />
```

The component can now be reused in different features.

---

**### 🟡 26.9 Services Should Have Clear Responsibilities**

Avoid a service such as:

```text
ApplicationService
```

containing:

```text
User API
Product API
Authentication
Payments
Reports
Logging
```

Prefer focused services:

```text
UserService
ProductService
AuthService
PaymentService
ReportService
```

This follows the **Single Responsibility Principle**.

---

**### 🟢 26.10 DRY Principle**

DRY means:

> Don't Repeat Yourself.

Instead of repeating:

```typescript
const url = `${baseUrl}/users`;
```

in many places, centralize API configuration and reusable logic.

However, do not over-abstract simple code.

The goal is reusable and understandable code, not maximum abstraction.

---

**### 🟡 26.11 SOLID in Angular**

SOLID principles can be applied to Angular applications.

### S — Single Responsibility

One class should have one main responsibility.

### O — Open/Closed

Code should be extendable without unnecessary modification.

### L — Liskov Substitution

Subtypes should be usable wherever their base type is expected.

### I — Interface Segregation

Prefer focused interfaces over large interfaces.

### D — Dependency Inversion

Depend on abstractions and injected dependencies rather than tightly creating concrete implementations.

In Angular, Dependency Injection naturally supports the last principle.

---

**### 🟢 26.12 Avoid Hardcoded Values**

Avoid:

```typescript
this.http.get("http://localhost:8080/api/users");
```

Prefer configuration:

```typescript
this.http.get(`${environment.apiUrl}/users`);
```

But remember:

> Frontend environment configuration is not a place for secrets.

---

**### 🟢 26.13 Error Handling**

Do not ignore errors:

```typescript
this.service.getUsers().subscribe((users) => {
  this.users = users;
});
```

Handle important failures:

```typescript
this.service.getUsers().subscribe({
  next: (users) => {
    this.users = users;
  },
  error: (error) => {
    this.errorMessage = "Unable to load users";
  },
});
```

For global HTTP concerns, an interceptor can also be appropriate.

---

**### 🟡 26.14 Loading States**

Good applications should tell users when data is being loaded.

```typescript
loading = signal(false);

loadUsers() {
  this.loading.set(true);

  this.userService.getUsers()
    .subscribe({
      next: users => {
        this.users.set(users);
      },
      error: () => {
        // handle error
      },
      complete: () => {
        this.loading.set(false);
      }
    });
}
```

UI:

```html
@if (loading()) {
<p>Loading...</p>
}
```

---

**### 🟢 26.15 Avoid Memory Leaks**

Use:

```text
AsyncPipe
takeUntilDestroyed()
```

when appropriate.

Avoid unnecessary manual subscriptions.

```html
<p>{{ users$ | async }}</p>
```

is often preferable to manually subscribing just to display data.

---

**### 🟡 26.16 Avoid Overusing Global State**

Not every piece of state belongs in NgRx or another global store.

Example:

```text
Modal open/closed
Selected tab
Input value
```

can remain local.

Global state is more appropriate for data such as:

```text
Authenticated user
Shopping cart
Shared application configuration
Complex shared state
```

---

**### 🟢 26.17 Lazy Load Large Features**

Large features should generally be lazy-loaded when they are not needed during the initial application load.

```typescript
{
  path: 'admin',
  loadChildren: () =>
    import('./admin/admin.routes')
      .then(m => m.ADMIN_ROUTES)
}
```

This reduces the initial JavaScript required by the application.

---

**### 🟡 26.18 Use Modern Angular Features**

For new Angular applications, consider:

```text
Standalone components
Signals
@if / @for
input()
output()
@defer
inject()
takeUntilDestroyed()
```

But when working on an existing enterprise project, follow the project's established patterns unless there is a reason to migrate.

---

**### 🟢 26.19 Naming Conventions**

Use clear names:

```text
user.service.ts
user.component.ts
user.routes.ts
user.model.ts
```

Prefer:

```typescript
getUserById();
```

over:

```typescript
getData();
```

Good names reduce the need for comments.

---

**### 🟢 26.20 Architecture Best Practices**

A good Angular application should aim for:

```text
Feature-based organization
        ↓
Small components
        ↓
Focused services
        ↓
Appropriate state management
        ↓
Reusable UI
        ↓
Lazy loading
        ↓
Testing
        ↓
Clear error handling
```

---

**### 🟢 26.21 Architecture Interview Questions**

**Beginner: How would you structure an Angular application?**

**Answer:** I would generally organize it by business features, keep reusable functionality in shared areas, keep application-wide infrastructure separate, and use focused components and services.

**Intermediate: What should a component contain?**

**Answer:** A component should mainly handle UI and user interaction. Complex reusable business or API logic should generally be moved into services or appropriate state layers.

**Intermediate: What is feature-based architecture?**

**Answer:** Feature-based architecture organizes code around business features such as users, orders, and products rather than putting all components or services into global technical folders.

**Intermediate: When should you use global state?**

**Answer:** Use global state when data is shared across many parts of the application or when state transitions are complex. Local state should remain local when possible.

**Advanced: How would you design a large Angular application?**

**Answer:** I would use feature-based architecture, standalone APIs for new code, focused components and services, appropriate state management, lazy loading for large features, shared reusable UI, consistent error handling, and automated testing.

---

**### 🟡 26.22 Architecture Follow-up Questions**

1. How would you structure a large Angular application?
2. Core vs Shared vs Feature?
3. What is feature-based architecture?
4. What is separation of concerns?
5. What is a smart component?
6. What is a presentational component?
7. What is the Single Responsibility Principle?
8. What is DRY?
9. How do SOLID principles apply to Angular?
10. How do you prevent components from becoming too large?
11. Where should API calls be placed?
12. When should you introduce a shared service?
13. When should you use global state?
14. How do you avoid prop drilling?
15. How do you design reusable components?
16. How do you handle errors globally?
17. How do you prevent memory leaks?
18. How do you optimize a large Angular application?
19. How would you organize authentication?
20. How would you design Angular for maintainability?

---

**### Key Takeaways: Architecture & Best Practices**

✅ **Feature-based architecture** → Organize around business features
✅ **Small components** → Easier to maintain
✅ **Focused services** → Clear responsibilities
✅ **Core** → Application-wide infrastructure
✅ **Shared** → Reusable functionality
✅ **Local state** → Keep local when possible
✅ **Global state** → Use only when needed
✅ **Lazy loading** → Improve initial loading
✅ **DRY** → Avoid unnecessary duplication
✅ **SOLID** → Improve maintainability
✅ **Separation of concerns** → Keep responsibilities clear
✅ **Testing** → Prevent regressions
✅ **Modern Angular** → Use appropriate modern APIs for new development

---

## 27. Angular + Backend Integration

### 🟢 27.1 How Angular Communicates with a Backend

Angular normally communicates with a backend using HTTP APIs.

Typical architecture:

```text
Angular
   ↓
HttpClient
   ↓
REST API
   ↓
Spring Boot / Node.js / .NET
   ↓
Database
```

For your typical Angular + Spring Boot application:

```text
Angular
   ↓
HttpClient
   ↓
Spring Boot REST API
   ↓
Service Layer
   ↓
DAO/Repository
   ↓
PostgreSQL
```

---

**### 🟢 27.2 REST API**

REST APIs expose resources through HTTP endpoints.

Example:

```text
GET    /api/users
GET    /api/users/10
POST   /api/users
PUT    /api/users/10
PATCH  /api/users/10
DELETE /api/users/10
```

Angular calls these endpoints using `HttpClient`.

---

**### 🟢 27.3 Angular Service for Backend Communication**

Example:

```typescript
@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "/api/users";

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.apiUrl, user);
  }
}
```

The component should generally use the service rather than directly building HTTP requests everywhere.

---

**### 🟢 27.4 Request and Response Flow**

Example:

```text
User clicks "Load Users"
          ↓
Angular Component
          ↓
UserService
          ↓
HttpClient
          ↓
Spring Boot API
          ↓
Database
          ↓
Spring Boot response
          ↓
HttpClient Observable
          ↓
Angular Component
          ↓
UI
```

---

**### 🟢 27.5 DTOs**

DTO means:

> Data Transfer Object

A backend may return:

```json
{
  "id": 1,
  "name": "John",
  "email": "john@example.com"
}
```

Angular can define a matching interface:

```typescript
export interface User {
  id: number;
  name: string;
  email: string;
}
```

Then:

```typescript
this.http.get<User[]>("/api/users");
```

**Important:** TypeScript interfaces provide compile-time typing; they do not validate arbitrary runtime JSON automatically.

---

**### 🟢 27.6 HTTP Status Codes**

Angular should understand common backend responses.

```text
200 → Successful request
201 → Resource created
204 → Successful request with no content

400 → Bad request
401 → Authentication required/invalid
403 → Forbidden
404 → Resource not found
409 → Conflict
422 → Validation-related error (commonly used)
500 → Server error
```

The exact status code used for validation/conflict cases depends on the backend API design.

---

**### 🟢 27.7 Handling Backend Errors**

Example:

```typescript
this.userService.getUsers().subscribe({
  next: (users) => {
    this.users = users;
  },

  error: (error) => {
    if (error.status === 404) {
      this.message = "Users not found";
    } else if (error.status === 500) {
      this.message = "Server error";
    }
  },
});
```

For application-wide handling, an HTTP interceptor may be more appropriate.

---

**### 🟢 27.8 Angular + Spring Boot CORS**

During development:

```text
Angular
http://localhost:4200

        ↓

Spring Boot
http://localhost:8080
```

Different origins can trigger CORS restrictions.

Spring Boot can be configured to allow the required Angular origin.

Conceptually:

```text
Browser
   ↓
Angular request
   ↓
CORS check
   ↓
Spring Boot
```

**Interview Point:**

> CORS must be configured on the server side; Angular cannot bypass browser CORS restrictions by itself.

---

**### 🟢 27.9 Proxy Configuration**

During local development, Angular can use a development proxy so frontend requests can be made through the development server.

Conceptually:

```text
Angular
/api/users
     ↓
Development Proxy
     ↓
http://localhost:8080/api/users
```

This can simplify local development and avoid some cross-origin development issues.

It does not replace proper production CORS/security configuration.

---

**### 🟢 27.10 Authentication Flow**

Typical Angular + Spring Boot JWT flow:

```text
Angular Login Form
       ↓
POST /api/auth/login
       ↓
Spring Boot
       ↓
Validate credentials
       ↓
JWT returned
       ↓
Angular stores/handles token
       ↓
HTTP Interceptor
       ↓
Authorization: Bearer <token>
       ↓
Spring Boot validates JWT
       ↓
Protected API
```

---

**### 🟢 27.11 Authorization**

Authentication tells the backend who the user is.

Authorization determines what the user can do.

Example:

```text
ADMIN
 ├── View users
 ├── Delete users
 └── Manage settings

USER
 ├── View profile
 └── Update profile
```

Angular can hide UI elements:

```html
@if (isAdmin()) {
<button>Delete User</button>
}
```

But the backend must also verify the user's role/permission.

---

**### 🟢 27.12 Authentication Interceptor**

An interceptor can add the JWT to requests.

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const token = authService.getToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
```

This avoids manually adding the token to every API call.

---

**### 🟡 27.13 Handling 401 Globally**

If the backend returns:

```text
401 Unauthorized
```

the interceptor can detect it.

Conceptually:

```text
API Request
    ↓
401
    ↓
Interceptor
    ↓
Clear authentication
    ↓
Redirect to login
```

Be careful with automatic retries so that the application does not create an infinite request loop.

---

**### 🟡 27.14 Pagination**

Backend:

```text
GET /api/users?page=0&size=20
```

Angular:

```typescript
const params = new HttpParams().set("page", 0).set("size", 20);

this.http.get<User[]>("/api/users", { params });
```

Typical flow:

```text
User selects page
      ↓
Angular sends page/size
      ↓
Backend queries database
      ↓
Backend returns page
      ↓
Angular displays results
```

---

**### 🟡 27.15 Searching and Filtering**

Example:

```typescript
const params = new HttpParams().set("search", searchTerm).set("page", 0);

return this.http.get<User[]>("/api/users", { params });
```

For search boxes, `debounceTime()` can prevent an API call on every keystroke.

```typescript
searchControl.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((value) => this.userService.search(value)),
);
```

---

**### 🟡 27.16 File Upload with Backend**

Angular:

```typescript
const formData = new FormData();

formData.append("file", selectedFile);

return this.http.post("/api/files/upload", formData);
```

Backend receives the multipart request.

The exact backend implementation depends on the backend framework.

---

**### 🟢 27.17 Environment-specific API URLs**

Development:

```typescript
apiUrl: "http://localhost:8080/api";
```

Production:

```typescript
apiUrl: "https://api.example.com/api";
```

The frontend should use configuration rather than hardcoding backend URLs throughout the application.

---

**### 🟡 27.18 Error Response Structure**

A backend should ideally return a consistent error format.

Example:

```json
{
  "status": 400,
  "message": "Invalid email",
  "timestamp": "2026-08-09T10:30:00Z"
}
```

Angular can then handle errors consistently.

For example:

```typescript
(error) => {
  this.message = error.error.message;
};
```

The exact error contract should be agreed between frontend and backend teams.

---

**### 🟡 27.19 Angular + Spring Boot Architecture**

A clean architecture can look like:

```text
┌─────────────────────┐
│      Angular        │
│     Components      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      Services       │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│     HttpClient      │
└──────────┬──────────┘
           ↓
        REST API
           ↓
┌─────────────────────┐
│     Controller      │
│    Spring Boot      │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│      Service        │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│ Repository / DAO    │
└──────────┬──────────┘
           ↓
┌─────────────────────┐
│     PostgreSQL      │
└─────────────────────┘
```

---

**### 🟢 27.20 Full CRUD Flow**

### Create

```text
Angular Form
    ↓
POST
    ↓
Spring Boot
    ↓
Database INSERT
    ↓
201 Created
```

### Read

```text
Angular
    ↓
GET
    ↓
Spring Boot
    ↓
Database SELECT
    ↓
JSON
    ↓
Angular
```

### Update

```text
Angular
    ↓
PUT/PATCH
    ↓
Spring Boot
    ↓
Database UPDATE
```

### Delete

```text
Angular
    ↓
DELETE
    ↓
Spring Boot
    ↓
Database DELETE
```

---

**### 🟢 27.21 Angular + Backend Interview Questions**

**Beginner: How does Angular communicate with Spring Boot?**

**Answer:** Angular uses `HttpClient` to send HTTP requests to Spring Boot REST endpoints. Spring Boot processes the request and usually returns JSON data.

**Beginner: Where should API calls be written?**

**Answer:** API calls should generally be placed in Angular services rather than directly throughout components.

**Intermediate: How do you handle authentication?**

**Answer:** A common approach is JWT-based authentication where Angular sends credentials to the backend, receives a token, and an HTTP interceptor adds the token to protected API requests.

**Intermediate: What is CORS?**

**Answer:** CORS is a browser security mechanism that controls whether requests from one origin can access resources from another origin. It is generally configured on the backend.

**Intermediate: How do you handle API errors?**

**Answer:** Handle important errors at the component/service level and use an HTTP interceptor for cross-cutting concerns such as common error handling or authentication behavior.

**Advanced: How would you design Angular and Spring Boot communication?**

**Answer:** I would expose REST APIs from Spring Boot, keep HTTP communication inside Angular services, use typed request/response models, use interceptors for cross-cutting HTTP concerns, implement authentication and authorization on the backend, and maintain a consistent API/error contract.

**Advanced: Is hiding an admin button enough for security?**

**Answer:** No. Hiding UI elements improves the user experience but does not provide security. The backend must independently verify authorization for every protected operation.

---

**### 🟡 27.22 Backend Integration Follow-up Questions**

1. How does Angular communicate with Spring Boot?
2. What is REST?
3. What is HttpClient?
4. Why should API calls be placed in services?
5. What is a DTO?
6. How do you type API responses?
7. How do you handle HTTP errors?
8. What is CORS?
9. How do you solve CORS in Angular + Spring Boot?
10. What is an Angular proxy?
11. How does JWT authentication work?
12. What does an HTTP interceptor do?
13. How do you handle a 401 response?
14. 401 vs 403?
15. How do you implement role-based authorization?
16. How would you implement pagination?
17. How would you implement search?
18. How would you implement file upload?
19. How would you handle API validation errors?
20. How would you design a consistent error response?
21. How would you prevent duplicate API requests?
22. How would you secure Angular + Spring Boot communication?
23. What should Angular handle and what should Spring Boot handle?
24. How would you design a complete CRUD application?
25. How would you troubleshoot an Angular API integration problem?

---

**### Key Takeaways: Angular + Backend Integration**

✅ **HttpClient** → Angular ↔ Backend communication
✅ **Service** → Centralize API calls
✅ **REST** → Common API architecture
✅ **DTO/interface** → Define expected data structure
✅ **CORS** → Cross-origin browser security
✅ **Proxy** → Useful for local development
✅ **JWT** → Common authentication mechanism
✅ **Interceptor** → Add tokens and handle common HTTP behavior
✅ **401** → Authentication problem
✅ **403** → Authorization problem
✅ **Pagination** → Request data in smaller pages
✅ **debounceTime()** → Avoid excessive search requests
✅ **Backend authorization** → Real security boundary
✅ **Consistent API contract** → Easier frontend/backend integration

## 28. Interview Preparation

### 🟢 28.1 How to Answer Angular Interview Questions

A good interview answer should usually follow:

```text
Definition
   ↓
Why it is used
   ↓
Simple example
   ↓
Real project usage
```

Example:

**Question:** What is a Service in Angular?

**Good Answer:**

> A Service is a class used to hold reusable logic and functionality that can be shared across components. It is commonly used for API calls, business logic, and shared state. Angular's Dependency Injection system provides services to components. For example, I would create a UserService to communicate with the backend instead of making HTTP calls directly inside the component.

This is better than simply saying:

> "A service is used for dependency injection."

---

**### 🟢 28.2 Definition vs Practical Understanding**

Interviewers usually want to know whether you can apply Angular concepts.

For example:

**Question:** What is `@defer`?

Weak answer:

> "`@defer` is used to defer content."

Better answer:

> "`@defer` allows Angular to delay loading the code required by a component or other dependencies until a trigger occurs. I would use it for heavy UI such as charts or large components that aren't required during the initial page load."

---

**### 🟢 28.3 Explain Concepts With Examples**

When answering technical questions, use a small example.

Instead of:

> "Signals are reactive."

Say:

```typescript
count = signal(0);

increment() {
  this.count.update(value => value + 1);
}
```

Then explain:

> "The Signal stores the state, and Angular tracks where the Signal is used. When its value changes, Angular can update the relevant UI."

---

**### 🟢 28.4 Be Ready for Follow-up Questions**

If you say:

> "I use an HTTP interceptor for JWT."

The interviewer may ask:

```text
What is an interceptor?
Why use it?
How do you add the token?
What happens when the token expires?
How do you handle 401?
```

Therefore, don't memorize isolated definitions.

Understand:

```text
Concept
   ↓
Why?
   ↓
How?
   ↓
Example
   ↓
Limitations
```

---

**### 🟢 28.5 Important Angular Topics to Know**

Before an Angular interview, make sure you understand:

```text
Components
Templates
Data Binding
Directives
Pipes
Services
Dependency Injection
Lifecycle Hooks
Forms
Routing
Guards
HttpClient
Interceptors
RxJS
Observables
Signals
State Management
Change Detection
OnPush
Lazy Loading
@defer
Standalone Components
Testing
Security
Performance
Architecture
```

---

**### 🟢 28.6 Questions You Should Be Able to Answer Quickly**

You should be comfortable answering:

1. What is Angular?
2. What is a Component?
3. What is Dependency Injection?
4. What is a Service?
5. What are Directives?
6. What are Pipes?
7. What is Data Binding?
8. What is RxJS?
9. What is an Observable?
10. Observable vs Promise?
11. What is a Subject?
12. What is `BehaviorSubject`?
13. What are Signals?
14. Signals vs RxJS?
15. What is change detection?
16. What is OnPush?
17. What are lifecycle hooks?
18. What is lazy loading?
19. What is `@defer`?
20. What are standalone components?
21. What are route guards?
22. What are HTTP interceptors?
23. How does Angular communicate with Spring Boot?
24. How do you handle authentication?
25. How do you handle errors?
26. How do you optimize Angular performance?
27. How do you secure Angular applications?
28. How do you structure a large Angular application?

---

**### 🟡 28.7 Scenario-Based Questions**

Interviewers may ask questions such as:

**"The API is being called multiple times. What would you check?"**

Think:

```text
Multiple subscriptions?
Multiple component initialization?
Duplicate API calls?
Interceptor?
Retry operator?
AsyncPipe usage?
```

---

**"The Angular application is slow. What would you do?"**

Think:

```text
Profile first
    ↓
Bundle size?
    ↓
Change detection?
    ↓
Large lists?
    ↓
Expensive template operations?
    ↓
Images?
    ↓
API/network?
    ↓
Lazy loading / @defer?
```

---

**"A user can see the admin page but should not access it. What would you do?"**

Answer:

> I would use a route guard for the client-side navigation experience, but I would also enforce authorization on the backend. The backend must verify the user's role before allowing the operation.

---

**### 🟢 28.8 How to Explain Your Project**

Use this structure:

```text
1. What is the project?
2. What problem does it solve?
3. What technologies did you use?
4. What was your responsibility?
5. How does the architecture work?
6. What challenges did you face?
7. How did you solve them?
8. What did you learn?
```

Example:

> "The application is an investment and wealth management platform. I worked on the Angular frontend and Spring Boot backend. Angular communicates with REST APIs exposed by Spring Boot, and PostgreSQL is used for persistence. I worked on components, forms, API integration, authentication, and the application flow."

---

**### 🟡 28.9 How to Answer "What Was Your Contribution?"**

Avoid:

> "I worked on Angular."

Instead explain specific responsibilities:

```text
Angular components
Forms
API integration
Routing
Authentication
Reusable components
Bug fixing
Performance improvements
Backend integration
```

Only mention things you actually worked on.

---

**### 🟢 28.10 If You Don't Know the Answer**

Do not invent an answer.

A good response is:

> "I haven't worked with that directly, but I understand the basic concept. My understanding is..."

Or:

> "I haven't implemented that myself yet, but I would approach it by..."

This is much better than confidently giving an incorrect answer.

---

**### 🟡 28.11 Interview Preparation Strategy**

Use three levels:

```text
Level 1
Definition
   ↓
Level 2
How it works
   ↓
Level 3
Real-world usage
```

For important topics, add:

```text
Advantages
Disadvantages
Alternatives
Common mistakes
```

---

**### 🟢 28.12 Final Interview Preparation Questions**

Before the interview, practice answering:

1. Tell me about yourself.
2. Explain your Angular project.
3. What was your role?
4. Explain your application architecture.
5. How does Angular communicate with your backend?
6. How did you implement authentication?
7. How did you handle API errors?
8. How did you structure the Angular application?
9. What Angular concepts did you use?
10. What was the most difficult problem you solved?
11. How did you debug it?
12. How did you improve performance?
13. What would you improve if you had more time?
14. Why did you choose Angular?
15. What is the difference between Angular and other frontend frameworks?

---

**### Key Takeaways: Interview Preparation**

✅ Understand concepts, don't just memorize definitions  
✅ Always know **why** a feature is used  
✅ Give small examples  
✅ Connect answers to your project  
✅ Be prepared for follow-up questions  
✅ Practice scenario-based questions  
✅ Never claim experience you don't have  
✅ Explain your own contribution clearly  
✅ If you don't know something, be honest  
✅ Practice speaking answers, not just reading them

---

## 29. Comparison Questions

Comparison questions are extremely common in Angular interviews.

---

**### 🟢 29.1 Component vs Directive**

| Component           | Directive                              |
| ------------------- | -------------------------------------- |
| Has a template      | Usually does not have its own template |
| Represents UI       | Adds behavior or modifies elements     |
| Uses `@Component`   | Uses `@Directive`                      |
| Main building block | Used to enhance existing elements      |

---

**### 🟢 29.2 Component vs Service**

| Component        | Service                   |
| ---------------- | ------------------------- |
| Handles UI       | Handles reusable logic    |
| Has template     | No template               |
| User interaction | API/business/shared logic |
| Display-oriented | Logic-oriented            |

---

**### 🟢 29.3 Observable vs Promise**

| Observable                        | Promise                            |
| --------------------------------- | ---------------------------------- |
| Can emit multiple values          | Resolves once                      |
| Lazy by default                   | Starts immediately when created    |
| Can be cancelled by unsubscribing | Native Promise cannot be cancelled |
| Many RxJS operators               | `.then()` / `.catch()`             |
| Useful for streams                | Useful for one async result        |

Example Observable:

```typescript
users$.pipe(map((users) => users.length));
```

Promise:

```typescript
fetch("/api/users").then((response) => response.json());
```

---

**### 🟢 29.4 Subject vs BehaviorSubject**

| Subject                                  | BehaviorSubject                   |
| ---------------------------------------- | --------------------------------- |
| Does not require initial value           | Requires initial value            |
| New subscribers don't get previous value | New subscriber gets current value |
| Useful for events                        | Useful for current state          |
| `next()` sends values                    | `next()` sends values             |

Example:

```typescript
const subject = new Subject<number>();

const state = new BehaviorSubject<number>(0);
```

---

**### 🟢 29.5 Signals vs Observables**

| Signals                            | Observables                    |
| ---------------------------------- | ------------------------------ |
| Angular reactive state primitive   | Async/event stream abstraction |
| Read using `signal()` value syntax | Subscribe or use AsyncPipe     |
| Great for state                    | Great for streams              |
| `computed()` for derived state     | RxJS operators                 |
| Synchronous state reads            | Can represent async values     |

They are not necessarily replacements for each other.

---

**### 🟢 29.6 Promise vs async/await**

`async/await` is syntax built around Promises.

```typescript
async loadUser() {
  const user =
    await this.userService.getUser();

  console.log(user);
}
```

It does not turn a Promise into an Observable.

---

**### 🟢 29.7 `*ngIf` vs `@if`**

| `*ngIf`                           | `@if`                           |
| --------------------------------- | ------------------------------- |
| Older structural directive syntax | Modern built-in control flow    |
| Uses `NgIf`                       | Built into Angular control flow |
| Common in older code              | Recommended modern syntax       |
| Directive-based                   | Built-in template control flow  |

---

**### 🟢 29.8 `*ngFor` vs `@for`**

| `*ngFor`                        | `@for`                    |
| ------------------------------- | ------------------------- |
| Older syntax                    | Modern syntax             |
| Uses `NgFor`                    | Built-in control flow     |
| `trackBy` commonly used         | `track` expression        |
| Common in existing applications | Preferred modern approach |

Example:

```html
@for (user of users; track user.id) {
<p>{{ user.name }}</p>
}
```

---

**### 🟢 29.9 Constructor vs ngOnInit**

| Constructor                              | ngOnInit                              |
| ---------------------------------------- | ------------------------------------- |
| JavaScript/TypeScript class construction | Angular lifecycle hook                |
| Mainly dependency injection              | Component initialization              |
| Runs when object is created              | Runs after Angular initializes inputs |
| Not intended for API initialization      | Common place for initialization       |

---

**### 🟢 29.10 `set()` vs `update()` for Signals**

```typescript
count.set(10);
```

Sets a specific value.

```typescript
count.update((value) => value + 1);
```

Calculates a new value from the current value.

```text
set()    → Give me the new value
update() → Calculate the new value
```

---

**### 🟢 29.11 `computed()` vs `effect()`**

| computed()                           | effect()                         |
| ------------------------------------ | -------------------------------- |
| Creates derived state                | Performs side effects            |
| Returns a Signal                     | Does not represent derived state |
| Should be preferred for calculations | Used for external side effects   |
| Lazy/derived computation             | Runs when dependencies change    |

Example:

```typescript
total = computed(() => price() * quantity());
```

Effect:

```typescript
effect(() => {
  console.log(count());
});
```

---

**### 🟢 29.12 `@defer` vs Lazy Loading**

| Lazy Loading                          | `@defer`                                   |
| ------------------------------------- | ------------------------------------------ |
| Commonly loads routes/features lazily | Defers dependencies in a template          |
| Route-level architecture              | Component/UI-level deferral                |
| Triggered by navigation               | Can use viewport, interaction, timer, etc. |
| Splits feature areas                  | Splits deferred dependencies               |

They can be used together.

---

**### 🟢 29.13 Pure vs Impure Pipe**

| Pure                             | Impure                                      |
| -------------------------------- | ------------------------------------------- |
| Default                          | `pure: false`                               |
| Runs when relevant input changes | Can run during every change detection cycle |
| Better performance               | Potentially expensive                       |
| Preferred                        | Use carefully                               |

---

**### 🟢 29.14 `@Input()` vs `input()`**

| `@Input()`                  | `input()`                 |
| --------------------------- | ------------------------- |
| Traditional API             | Modern signal-based API   |
| Decorator-based             | Function-based            |
| Common in existing projects | Modern Angular approach   |
| Value accessed normally     | Signal accessed with `()` |

---

**### 🟢 29.15 `@Output()` vs `output()`**

| `@Output()`                  | `output()`                       |
| ---------------------------- | -------------------------------- |
| Traditional event API        | Modern API                       |
| Uses `EventEmitter` commonly | Uses Angular's modern output API |
| Common in existing code      | Modern Angular                   |

---

**### 🟢 29.16 Default vs OnPush**

| Default                      | OnPush                                     |
| ---------------------------- | ------------------------------------------ |
| Broader change detection     | More selective checking                    |
| Easier for beginners         | Better control/performance                 |
| More work in large trees     | Can reduce unnecessary checks              |
| Common in older applications | Recommended for performance-sensitive code |

---

**### 🟢 29.17 Template-driven vs Reactive Forms**

| Template-driven               | Reactive                        |
| ----------------------------- | ------------------------------- |
| Form logic mostly in template | Form model in TypeScript        |
| Easier for simple forms       | Better for complex forms        |
| Less explicit                 | More explicit                   |
| Uses `ngModel`                | Uses `FormControl`, `FormGroup` |
| Good for simple forms         | Better for large/complex forms  |

---

**### 🟢 29.18 Authentication vs Authorization**

| Authentication               | Authorization                     |
| ---------------------------- | --------------------------------- |
| Who are you?                 | What can you do?                  |
| Login                        | Permissions                       |
| Identity                     | Roles/access                      |
| Happens before authorization | Depends on authenticated identity |

---

**### 🟢 29.19 401 vs 403**

```text
401 → Authentication problem
403 → Authorization problem
```

Example:

```text
No valid login → 401

Logged in but no admin permission → 403
```

---

**### 🟢 29.20 PUT vs PATCH**

| PUT                                             | PATCH                              |
| ----------------------------------------------- | ---------------------------------- |
| Usually represents full replacement             | Partial update                     |
| Sends complete resource representation commonly | Sends only changed fields commonly |

Example:

```text
PUT /users/10
```

may send:

```json
{
  "name": "John",
  "email": "john@example.com",
  "role": "USER"
}
```

PATCH might send:

```json
{
  "role": "ADMIN"
}
```

---

**### 🟢 29.21 localStorage vs sessionStorage vs Cookies**

| localStorage                         | sessionStorage                 | Cookies                         |
| ------------------------------------ | ------------------------------ | ------------------------------- |
| Persists until removed               | Usually until tab/session ends | Controlled by cookie attributes |
| Accessible by JS                     | Accessible by JS               | Can be HttpOnly                 |
| Not automatically sent with requests | Not automatically sent         | Can be sent automatically       |
| XSS concerns                         | XSS concerns                   | CSRF considerations             |

Security depends on the complete authentication design, not simply the storage mechanism.

---

**### 🟢 29.22 Angular vs React**

| Angular                                | React                        |
| -------------------------------------- | ---------------------------- |
| Full frontend framework                | UI library/ecosystem         |
| TypeScript-first                       | JavaScript/TypeScript        |
| Routing available in Angular ecosystem | Usually added separately     |
| Dependency Injection built in          | No Angular-style built-in DI |
| RxJS commonly integrated               | Different ecosystem patterns |
| Opinionated structure                  | More flexible                |

Do not say one is universally better. The right choice depends on project requirements.

---

**### 🟢 29.23 Angular vs AngularJS**

| Angular                  | AngularJS                     |
| ------------------------ | ----------------------------- |
| Modern framework         | Older framework               |
| TypeScript commonly used | JavaScript                    |
| Component-based          | Controller/scope architecture |
| Modern DI and rendering  | Older architecture            |
| Modern Angular releases  | Legacy technology             |

---

**### 🟢 29.24 Common Comparison Questions**

Be prepared for:

```text
Observable vs Promise
Subject vs BehaviorSubject
Signals vs Observables
Component vs Directive
Component vs Service
Pure vs Impure Pipe
Reactive vs Template-driven Forms
Default vs OnPush
Constructor vs ngOnInit
Authentication vs Authorization
401 vs 403
PUT vs PATCH
localStorage vs Cookies
Lazy Loading vs @defer
@Input vs input()
@Output vs output()
computed() vs effect()
Angular vs React
Angular vs AngularJS
```

---

**### Key Takeaways: Comparison Questions**

✅ Don't just memorize differences  
✅ Explain **when to use each option**  
✅ Mention advantages and limitations  
✅ Use small examples  
✅ Connect comparisons to real project scenarios

---

## 30. Project-Based Interview Questions

This section is extremely important.

Interviewers often use your project to test whether you actually understand the technologies listed on your resume.

---

**### 🟢 30.1 Project Introduction**

Be prepared to answer:

> "Tell me about your project."

Use:

```text
Project
 ↓
Problem
 ↓
Solution
 ↓
Technology
 ↓
Your contribution
 ↓
Challenges
```

Example structure:

> "The project is a web-based investment and wealth management platform. It helps users manage investments and financial goals through an interactive application. The frontend uses Angular, while the backend uses Spring Boot and PostgreSQL. I worked on Angular components, forms, API integration, routing, and backend integration."

---

**### 🟢 30.2 Explain Your Architecture**

Be able to draw:

```text
User
 ↓
Angular UI
 ↓
Angular Services
 ↓
HttpClient
 ↓
Spring Boot REST API
 ↓
Service Layer
 ↓
DAO/Repository
 ↓
PostgreSQL
```

Then explain each layer.

---

**### 🟢 30.3 Why Angular?**

Possible answer:

> "Angular provides a structured framework for building large applications. It provides components, routing, dependency injection, forms, HTTP support, and a strong TypeScript-based development model, which makes it suitable for enterprise applications."

---

**### 🟢 30.4 Why Spring Boot?**

Possible answer:

> "Spring Boot simplifies building Java backend applications by providing auto-configuration, dependency injection, REST support, and integration with databases and other Spring technologies."

---

**### 🟢 30.5 Why PostgreSQL?**

Possible answer:

> "PostgreSQL is a reliable relational database with strong SQL support, transactions, constraints, and good integration with Spring-based applications."

---

**### 🟢 30.6 Explain an API End-to-End**

For example:

```text
User clicks Save
      ↓
Angular Form
      ↓
Component
      ↓
UserService
      ↓
HttpClient POST
      ↓
Spring Boot Controller
      ↓
Service
      ↓
Repository/DAO
      ↓
PostgreSQL
      ↓
Response
      ↓
Angular
      ↓
UI updated
```

You should be able to explain this without looking at the code.

---

**### 🟢 30.7 Explain Authentication**

Be prepared to explain:

```text
Login
 ↓
Backend validates credentials
 ↓
Token/session
 ↓
Angular authentication state
 ↓
Interceptor
 ↓
Protected API
 ↓
Backend authorization
```

Also know:

```text
Authentication ≠ Authorization
```

---

**### 🟢 30.8 Explain Your Angular Structure**

Be ready to explain why you separated:

```text
components/
services/
models/
guards/
interceptors/
routes/
```

For example:

> "Components focus mainly on UI and interaction, services handle API and reusable logic, guards handle route access, interceptors handle cross-cutting HTTP behavior, and models define the expected data structures."

---

**### 🟢 30.9 Explain a Difficult Problem**

Use:

```text
Problem
 ↓
Investigation
 ↓
Root Cause
 ↓
Solution
 ↓
Result
```

Example:

> "The Angular application was unable to call the Spring Boot API because the browser was blocking the request due to CORS. I checked the Network and Console tabs, identified the origin mismatch, and corrected the backend CORS configuration."

---

**### 🟡 30.10 Be Ready for "Why Did You Choose This Approach?"**

Interviewers may ask:

> "Why did you use a service?"

> "Why did you use an interceptor?"

> "Why did you use Reactive Forms?"

> "Why did you use PostgreSQL?"

> "Why did you use JWT?"

Always explain the reason, not just the implementation.

---

**### 🟡 30.11 Project Performance Questions**

Be prepared for:

**"How would you improve the application's performance?"**

Answer around:

```text
Lazy loading
@defer
OnPush
Efficient list rendering
Image optimization
API pagination
Caching where appropriate
Bundle optimization
Avoiding unnecessary API calls
Profiling
```

---

**### 🟡 30.12 Project Security Questions**

Be prepared for:

```text
How is authentication implemented?
How is authorization implemented?
How are API endpoints protected?
How do you handle JWT?
How do you prevent XSS?
How do you handle CORS?
Where are secrets stored?
Can a user bypass Angular guards?
```

Important answer:

> "Frontend guards improve navigation control but the backend is responsible for enforcing authorization."

---

**### 🟡 30.13 Project Debugging Questions**

Examples:

**"The API works in Postman but not in Angular. What would you check?"**

```text
URL
HTTP method
Request body
Headers
Authentication token
CORS
Browser Network tab
Interceptor
```

**"The API returns data but the UI doesn't update."**

Check:

```text
Observable subscription
Signal/state update
Template binding
Change detection
Response mapping
Console errors
```

---

**### 🟢 30.14 Project-Based Questions to Practice**

1. Explain your project.
2. What problem does it solve?
3. What is your role?
4. Why Angular?
5. Why Spring Boot?
6. Why PostgreSQL?
7. Explain the architecture.
8. Explain one API end-to-end.
9. Explain authentication.
10. Explain authorization.
11. How does Angular communicate with Spring Boot?
12. How did you structure Angular?
13. How did you handle forms?
14. How did you handle API errors?
15. How did you handle loading states?
16. How did you handle authentication errors?
17. What was your biggest challenge?
18. How did you debug it?
19. What performance improvements would you make?
20. How did you secure the application?
21. How would you scale the application?
22. What would you improve if you had more time?
23. What did you personally implement?
24. What did you learn from the project?
25. What would you do differently now?

---

**### 🟡 30.15 Project Cross-Questioning**

If you mention:

> "I used RxJS."

Expect:

```text
What is RxJS?
What is an Observable?
Why use Observable?
Observable vs Promise?
What operators did you use?
What is switchMap?
What is debounceTime?
How do you unsubscribe?
```

If you mention:

> "I used JWT."

Expect:

```text
What is JWT?
Where is it stored?
How is it sent?
What is an interceptor?
What happens when it expires?
How does the backend validate it?
```

If you mention:

> "I used PostgreSQL."

Expect:

```text
Why PostgreSQL?
What is a transaction?
What is a primary key?
What is an index?
How does your backend access it?
```

**Rule:**

> Anything on your resume is fair game for questioning.

---

**### 🟢 30.16 Project Answer Formula**

For almost any project question:

```text
What?
 ↓
Why?
 ↓
How?
 ↓
Example
 ↓
Challenge
 ↓
Result
```

This keeps answers structured and prevents rambling.

---

**### Key Takeaways: Project-Based Interviews**

✅ Know your architecture  
✅ Know your own contribution  
✅ Understand your APIs end-to-end  
✅ Know why you selected each technology  
✅ Be ready for follow-up questions  
✅ Understand authentication and authorization  
✅ Know your database interactions  
✅ Prepare real challenges you faced  
✅ Never claim work you didn't do  
✅ Anything on your resume can become an interview question

---

## 31. Final Knowledge Checklist

Use this checklist before an Angular interview.

---

**### 🟢 31.1 Angular Fundamentals**

- [ ] What is Angular?
- [ ] Angular architecture
- [ ] Components
- [ ] Templates
- [ ] Metadata
- [ ] Selectors
- [ ] Data binding
- [ ] Interpolation
- [ ] Property binding
- [ ] Event binding
- [ ] Two-way binding
- [ ] Directives
- [ ] Structural directives
- [ ] Attribute directives
- [ ] Pipes

---

**### 🟢 31.2 Components & Lifecycle**

- [ ] Component lifecycle
- [ ] `ngOnInit`
- [ ] `ngOnChanges`
- [ ] `ngOnDestroy`
- [ ] `ngAfterViewInit`
- [ ] Constructor vs `ngOnInit`
- [ ] Parent-child communication
- [ ] `input()`
- [ ] `output()`
- [ ] `model()`
- [ ] Content projection

---

**### 🟢 31.3 Dependency Injection**

- [ ] What is DI?
- [ ] Why use DI?
- [ ] `@Injectable`
- [ ] `providedIn: 'root'`
- [ ] Component-level providers
- [ ] Injector hierarchy
- [ ] `inject()`
- [ ] `@Inject`
- [ ] `@Qualifier` equivalent concepts / provider tokens
- [ ] `useClass`
- [ ] `useValue`
- [ ] `useFactory`
- [ ] `useExisting`

---

**### 🟢 31.4 RxJS**

- [ ] Observable
- [ ] Observer
- [ ] Subscription
- [ ] Subject
- [ ] BehaviorSubject
- [ ] ReplaySubject
- [ ] `map`
- [ ] `filter`
- [ ] `tap`
- [ ] `switchMap`
- [ ] `mergeMap`
- [ ] `concatMap`
- [ ] `exhaustMap`
- [ ] `debounceTime`
- [ ] `distinctUntilChanged`
- [ ] `catchError`
- [ ] `finalize`
- [ ] `shareReplay`
- [ ] `takeUntilDestroyed`
- [ ] AsyncPipe
- [ ] Observable vs Promise

---

**### 🟢 31.5 Signals**

- [ ] `signal()`
- [ ] `computed()`
- [ ] `effect()`
- [ ] `set()`
- [ ] `update()`
- [ ] `mutate()` / immutable updates
- [ ] Signal inputs
- [ ] Signal outputs
- [ ] Signals vs RxJS
- [ ] Signals and change detection

---

**### 🟢 31.6 Forms**

- [ ] Template-driven forms
- [ ] Reactive forms
- [ ] FormControl
- [ ] FormGroup
- [ ] FormArray
- [ ] Validators
- [ ] Custom validators
- [ ] Async validators
- [ ] `valueChanges`
- [ ] `statusChanges`
- [ ] Form states
- [ ] Form submission
- [ ] Dynamic forms

---

**### 🟢 31.7 Routing**

- [ ] Routes
- [ ] Router
- [ ] RouterLink
- [ ] Route parameters
- [ ] Query parameters
- [ ] Child routes
- [ ] Lazy loading
- [ ] `loadComponent`
- [ ] `loadChildren`
- [ ] Route guards
- [ ] Resolvers
- [ ] Navigation events
- [ ] Wildcard routes
- [ ] Route data

---

**### 🟢 31.8 HTTP & APIs**

- [ ] HttpClient
- [ ] GET
- [ ] POST
- [ ] PUT
- [ ] PATCH
- [ ] DELETE
- [ ] HttpParams
- [ ] HttpHeaders
- [ ] HTTP interceptors
- [ ] Error handling
- [ ] Retry
- [ ] Authentication
- [ ] JWT
- [ ] CORS
- [ ] API pagination
- [ ] API search/filtering

---

**### 🟢 31.9 State Management**

- [ ] Local component state
- [ ] Shared service state
- [ ] Signals
- [ ] BehaviorSubject
- [ ] NgRx concepts
- [ ] Store
- [ ] Actions
- [ ] Reducers
- [ ] Selectors
- [ ] Effects
- [ ] When to use global state
- [ ] When NOT to use global state

---

**### 🟢 31.10 Performance**

- [ ] Lazy loading
- [ ] `@defer`
- [ ] `@placeholder`
- [ ] `@loading`
- [ ] `@error`
- [ ] OnPush
- [ ] `track`
- [ ] Virtual scrolling
- [ ] Image optimization
- [ ] Bundle optimization
- [ ] Tree shaking
- [ ] Code splitting
- [ ] SSR
- [ ] Hydration
- [ ] Profiling

---

**### 🟢 31.11 Modern Angular**

- [ ] Standalone components
- [ ] `@if`
- [ ] `@for`
- [ ] `@switch`
- [ ] Signals
- [ ] `input()`
- [ ] `output()`
- [ ] `model()`
- [ ] `inject()`
- [ ] `@defer`
- [ ] `takeUntilDestroyed()`
- [ ] Zoneless Angular

---

**### 🟢 31.12 Security**

- [ ] XSS
- [ ] Angular sanitization
- [ ] DomSanitizer
- [ ] `bypassSecurityTrust...`
- [ ] Authentication
- [ ] Authorization
- [ ] Route guards
- [ ] JWT
- [ ] HttpOnly cookies
- [ ] CSRF/XSRF
- [ ] HTTPS
- [ ] CSP
- [ ] Trusted Types
- [ ] Frontend secrets
- [ ] Backend authorization

---

**### 🟢 31.13 Testing**

- [ ] Unit testing
- [ ] Integration testing
- [ ] E2E testing
- [ ] Jasmine
- [ ] Karma
- [ ] Jest/Vitest awareness
- [ ] TestBed
- [ ] ComponentFixture
- [ ] DebugElement
- [ ] Mocking
- [ ] HttpTestingController
- [ ] `fakeAsync`
- [ ] `tick`
- [ ] Testing forms
- [ ] Testing services
- [ ] Testing pipes

---

**### 🟢 31.14 Build & Tooling**

- [ ] Angular CLI
- [ ] `ng new`
- [ ] `ng serve`
- [ ] `ng build`
- [ ] `ng generate`
- [ ] AOT
- [ ] JIT
- [ ] Tree shaking
- [ ] Code splitting
- [ ] Source maps
- [ ] `angular.json`
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] Environment configuration
- [ ] Production builds

---

**### 🟢 31.15 Angular Internals**

- [ ] Ivy
- [ ] View Engine awareness
- [ ] Change detection
- [ ] Component tree
- [ ] OnPush
- [ ] ZoneJS
- [ ] Zoneless
- [ ] Rendering
- [ ] Dependency injection hierarchy
- [ ] Lifecycle
- [ ] Signals and rendering
- [ ] Angular compilation

---

**### 🟢 31.16 Architecture**

- [ ] Feature-based architecture
- [ ] Core vs Shared vs Feature
- [ ] Separation of concerns
- [ ] Smart vs presentational components
- [ ] Reusable components
- [ ] Service responsibilities
- [ ] SOLID
- [ ] DRY
- [ ] Error handling
- [ ] Loading states
- [ ] State management decisions
- [ ] Lazy loading
- [ ] Maintainability

---

**### 🟢 31.17 Angular + Spring Boot**

- [ ] REST APIs
- [ ] Angular HttpClient
- [ ] Spring Boot Controllers
- [ ] DTOs
- [ ] Service layer
- [ ] Repository/DAO
- [ ] PostgreSQL
- [ ] CRUD
- [ ] Authentication
- [ ] Authorization
- [ ] JWT
- [ ] HTTP Interceptor
- [ ] CORS
- [ ] Pagination
- [ ] Searching
- [ ] File upload
- [ ] Error responses
- [ ] API contracts

---

**### 🔴 31.18 Must-Know Interview Questions**

Before the interview, make sure you can answer these **without looking at notes**:

1. What is Angular?
2. Explain Angular architecture.
3. What is Dependency Injection?
4. How does Angular DI work?
5. What is a Component?
6. Component vs Directive?
7. What are lifecycle hooks?
8. Constructor vs `ngOnInit`?
9. What is RxJS?
10. Observable vs Promise?
11. Subject vs BehaviorSubject?
12. What is `switchMap()`?
13. `switchMap()` vs `mergeMap()`?
14. What are Signals?
15. Signals vs RxJS?
16. What is `computed()`?
17. What is `effect()`?
18. What is change detection?
19. Default vs OnPush?
20. What is lazy loading?
21. What is `@defer`?
22. What are standalone components?
23. `@if` vs `*ngIf`?
24. `@for` vs `*ngFor`?
25. What are Reactive Forms?
26. Reactive vs Template-driven Forms?
27. What are route guards?
28. What are HTTP interceptors?
29. How does Angular communicate with Spring Boot?
30. What is CORS?
31. How does JWT authentication work?
32. Authentication vs Authorization?
33. 401 vs 403?
34. How do you handle API errors?
35. How do you optimize Angular performance?
36. How do you prevent memory leaks?
37. How do you secure Angular?
38. How do you test Angular components?
39. What is TestBed?
40. What is AOT?
41. What is tree shaking?
42. What is Ivy?
43. How does Angular change detection work?
44. How does Angular DI resolve dependencies?
45. How would you structure a large Angular application?
46. Explain your project architecture.
47. Explain one API end-to-end.
48. What was the most difficult problem you solved?
49. How did you debug it?
50. What would you improve in your project?

---

**### 🔴 31.19 Final Interview Readiness Test**

You are interview-ready when you can do the following without notes:

**Level 1 — Explain**

```text
Can I define the concept?
```

**Level 2 — Understand**

```text
Can I explain how it works?
```

**Level 3 — Apply**

```text
Can I write a simple example?
```

**Level 4 — Compare**

```text
Can I explain when to use it instead of an alternative?
```

**Level 5 — Troubleshoot**

```text
Can I debug a real problem involving it?
```

**Level 6 — Project**

```text
Can I explain where I used it in my project?
```

If you can reach **Level 6** for the major Angular topics, you are in a strong position for an Angular interview.

---

**### 🔴 Final Rule**

Do not try to memorize this entire document word-for-word.

Instead:

```text
Understand
    ↓
Practice
    ↓
Explain aloud
    ↓
Write code
    ↓
Solve scenarios
    ↓
Connect to your project
```

The interviewer is not checking whether you can recite documentation.

They are checking whether you can:

```text
Understand Angular
       +
Build with Angular
       +
Debug Angular
       +
Make technical decisions
       +
Explain your decisions
```

---

**### Final Knowledge Checklist**

✅ Angular fundamentals  
✅ Components & lifecycle  
✅ Data binding  
✅ Directives & pipes  
✅ Dependency Injection  
✅ RxJS  
✅ Signals  
✅ Forms  
✅ Routing  
✅ HTTP/API integration  
✅ State management  
✅ Lazy loading  
✅ Performance  
✅ Modern Angular  
✅ Security  
✅ Testing  
✅ Build system  
✅ Angular internals  
✅ Architecture  
✅ Angular + Spring Boot integration  
✅ Project explanation  
✅ Scenario-based questions  
✅ Comparison questions  
✅ Debugging questions  
✅ Real-world design decisions

**If you can explain these topics and connect them to your project, you have covered the major areas expected in an Angular interview.**
