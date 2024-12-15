const createKey = (key: string) => {
  // Convert the key string into a CryptoKey using the Web Crypto API
  const encoder = new TextEncoder();
  const keyBuffer = encoder.encode(key.slice(0, 16).padEnd(16, "\0"));
  return crypto.subtle.importKey(
    "raw",
    keyBuffer,
    { name: "AES-CBC", length: 128 }, // AES with 128-bit key length (you can also use 256 or 192)
    false,
    ["decrypt", "encrypt"],
  );
};

export const encryptData = async (
  data: ArrayBuffer,
  key: string,
): Promise<{
  ciphertext: ArrayBuffer;
  iv: Uint8Array;
}> => {
  try {
    const cryptoKey = await createKey(key);

    // Generate a random 16-byte IV for AES-CBC (16 bytes = 128 bits)
    const iv = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]); // AES-CBC requires a 16-byte IV

    // Encrypt the data using AES-CBC
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv: iv },
      cryptoKey,
      data,
    );

    // The Web Crypto API returns an ArrayBuffer for the ciphertext
    return {
      ciphertext: ciphertext,
      iv: iv, // The IV used for encryption
    };
  } catch (error) {
    console.error("Error during AES-CBC encryption:", error);
    throw new Error("Encryption failed");
  }
};
export const decryptData = async (
  data: ArrayBuffer,
  key: string,
): Promise<{ data: ArrayBuffer }> => {
  try {
    const cryptoKey = await createKey(key);

    // Decrypt the data using AES-CBC
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "AES-CBC",
        iv: new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]),
      }, // Ensure iv is in the correct format (Uint8Array)
      cryptoKey,
      data,
    );

    // Return the decrypted data
    return {
      data: decryptedData, // The decrypted ArrayBuffer
    };
  } catch (error) {
    console.error("Error during AES-CBC decryption:", error);
    throw new Error("Decryption failed");
  }
};
