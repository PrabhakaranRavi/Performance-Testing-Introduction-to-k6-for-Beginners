# Performance Testing with k6

Welcome to my **Performance Testing with k6** study notes! This repository is where I, as a beginner learner, am recording what I’m learning about performance testing for web applications and APIs using k6. The focus is on understanding the basics of performance testing, writing tests, and analyzing results.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Writing Tests](#writing-tests)
- [Running Tests](#running-tests)
- [Understanding Metrics](#understanding-metrics)
- [Best Practices](#best-practices)
- [Resources](#resources)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This repository serves as a collection of my notes and scripts as I explore performance testing with k6. It's intended to help me (and hopefully others) get familiar with performance testing concepts, how to write tests with k6, and how to analyze the results.

## Features

- **Performance Testing Basics**: Learn the core concepts of performance testing.
- **Writing Scripts with k6**: Create performance tests using the k6 scripting language.
- **Types of Tests**: Explore load tests, stress tests, and spike tests.
- **Understanding Performance Metrics**: Gain insights into key performance metrics.
- **Checks and Assertions**: Validate application behavior under load.
- **Defining Thresholds**: Set performance expectations and validate them during tests.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [k6](https://k6.io/docs/getting-started/installation/) installed on your system.
- Basic understanding of JavaScript.
- Access to a web application or API for testing. You can use [test.k6.io](https://test.k6.io/) to practice.

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/performance-testing-with-k6.git
   cd performance-testing-with-k6
   ```

2. **Install dependencies (if any):**

   ```bash
   npm install
   ```

3. **Start writing your first test:**

   Create a new test file in the `tests/` directory:

   ```javascript
   import http from 'k6/http';
   import { check, sleep } from 'k6';

   export default function () {
     let res = http.get('https://test.k6.io/');
     check(res, { 'status was 200': (r) => r.status === 200 });
     sleep(1);
   }
   ```

## Writing Tests

### Load Tests

Load tests help you understand how your application behaves under typical user loads. You can define the number of virtual users (VUs) and the duration of the test:

```javascript
export const options = {
  vus: 50,
  duration: '30s',
};
```

### Stress Tests

Stress tests determine the breaking point of your application by gradually increasing the load until the system fails:

```javascript
export const options = {
  stages: [
    { duration: '2m', target: 50 },
    { duration: '5m', target: 100 },
    { duration: '2m', target: 0 },
  ],
};
```

### Spike Tests

Spike tests simulate sudden increases in traffic to see how your application handles it:

```javascript
export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '1m', target: 100 },
    { duration: '10s', target: 0 },
  ],
};
```

## Running Tests

You can run your k6 tests using the following command:

```bash
k6 run tests/your-test-file.js
```

You can also visualize the results using the k6 dashboard or integrate it with tools like Grafana.

## Understanding Metrics

k6 provides a variety of performance-related metrics, such as response times, request rates, and error rates. You can analyze these metrics to understand your application's performance.

## Best Practices

- Start with simple tests and gradually increase complexity.
- Use thresholds to ensure performance criteria are met.
- Regularly test your application to identify performance regressions.

## Resources

- [k6 Documentation](https://k6.io/docs/)
- [Test Website: test.k6.io](https://test.k6.io/)

## Contributing

If you have suggestions or improvements, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

Happy Testing! 🚀
