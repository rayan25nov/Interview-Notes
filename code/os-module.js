const os = require('os');

// 1. Fetch and print the operating system Information
console.log(os.type());
// 2. Fetch current user information
console.log(os.userInfo());
// 3. Fetch and print system uptime in hours
console.log(os.uptime() / 3600);
// 4. Fetch and print total system memory in GB
console.log(os.totalmem() / (1024 ** 3));
// 5. Fetch and print free system memory in GB
console.log(os.freemem() / (1024 ** 3));
// 6. Fetch and print CPU core information
console.log(os.cpus());
// 7. Fetch and print system architecture
console.log(os.arch());
// 8. Fetch and print system hostname
console.log(os.hostname());
// 9. Fetch and print system platform
console.log(os.platform());
// 10. Fetch and print home directory of the current user
console.log(os.homedir());
