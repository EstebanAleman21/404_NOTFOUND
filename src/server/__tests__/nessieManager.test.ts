import { nessieManager } from '../nessieManager';

// Mockear la función fetch
global.fetch = jest.fn();

describe('nessieManager', () => {
  describe('getCustomers', () => {
    it('should fetch customers successfully', async () => {
      const mockResponse = [
        {
          "_id": "66e5def29683f20dd5189b96",
          "first_name": "Sebastian",
          "last_name": "Rosas",
          "address": {
            "street_number": "2097",
            "street_name": "Ashford Road",
            "city": "Bettendorf",
            "state": "IA",
            "zip": "52722"
          }
        }
      ];

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const customers = await nessieManager.getCustomers();
      expect(customers).toEqual(mockResponse);
    });

    it('should throw an error if fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(nessieManager.getCustomers()).rejects.toThrow('Failed to fetch customers');
    });
  });
});