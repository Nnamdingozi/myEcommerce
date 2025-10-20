// // src/lib/logger.ts
// import pino from 'pino';

// const isDevelopment = process.env.NODE_ENV === 'development';

// /**
//  * A centralized, environment-aware logger for the application.
//  * 
//  * In Development:
//  * - Logs are beautifully formatted and colorized for easy reading.
//  * - Shows all log levels, including detailed 'debug' messages.
//  * 
//  * In Production:
//  * - Logs are structured as efficient JSON for consumption by logging services.
//  * - Hides 'debug' level logs to reduce noise and improve performance.
//  */
// const logger = pino({
//   // Set the minimum log level based on the environment.
//   level: isDevelopment ? 'debug' : 'info',

//   // Configure the output format based on the environment.
//   transport: isDevelopment 
//     ? {
//         // Use 'pino-pretty' for human-readable logs in development.
//         target: 'pino-pretty',
//         options: {
//           colorize: true, // Add colors to the output
//         },
//       }
//     // In production, do not use any special transport.
//     // This defaults to pino's fast, structured JSON output.
//     : undefined,
// });

// export default logger;


// src/lib/logger.ts (Simplified for Debugging)
import pino from 'pino';

// This version has NO local imports. It only depends on `pino` and `process`.
const logger = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: process.env.NODE_ENV === 'development' 
    ? { target: 'pino-pretty', options: { colorize: true } } 
    : undefined,
});

export default logger;