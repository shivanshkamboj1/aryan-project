const { nanoid } = require("nanoid");

async function done() {
  const promise = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(5); // Resolve after 1 second
    }, 1000);
  });
  console.log("h")
  return promise; // Return the result (5)
}

// Usage example:
done().then(result => {
  console.log('Result:', result); // Output: Result: 5 after 1s
});
