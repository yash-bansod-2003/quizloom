import bcrypt from "bcrypt";

class HashingService {
  async hash(data: string) {
    /**
     * Hashes the given data using SHA-256 algorithm.
     *
     * @param {string} data - The data to be hashed.
     * @returns {string} The hashed value.
     */
    const hashedData = await bcrypt.hash(data, 10);
    return hashedData;
  }

  async compare(data: string, hash: string) {
    /**
     * Compares two hashed values.
     *
     * @param {string} data - The data to compare.
     * @param {string} hash - The  hashed value.
     * @returns {boolean} True if the values are equal, False otherwise.
     */
    return await bcrypt.compare(data, hash);
  }
}

export default HashingService;
