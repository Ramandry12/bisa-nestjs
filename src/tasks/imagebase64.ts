import * as fs from 'fs';
import * as util from 'util';

export async function ImageToBase64(filePath: string): Promise<string> {
  const readFile = util.promisify(fs.readFile);
  try {
    const imageData = await readFile(filePath);
    const base64String = imageData.toString('base64');
    return base64String;
  } catch (error) {
    throw new Error(`Failed to read image file: ${error.message}`);
  }
}
