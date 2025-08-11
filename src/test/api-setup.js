import { vi, beforeEach, afterEach } from 'vitest'

// API testing specific setup
console.log('🔌 Setting up API integration testing...')

// Mock fetch for API testing
global.fetch = vi.fn()

// Reset fetch mock before each test
beforeEach(() => {
  fetch.mockClear()
})

// Clean up after each test
afterEach(() => {
  vi.restoreAllMocks()
})

// API test utilities
global.apiTestUtils = {
  // Mock API responses
  mockResponses: {
    // Kroger API responses
    kroger: {
      auth: {
        access_token: 'mock-kroger-token',
        token_type: 'bearer',
        expires_in: 3600,
      },
      products: {
        data: [
          {
            productId: '0001111041303',
            description: 'Organic Bananas',
            price: { regular: 1.99, promo: 1.49 },
            brand: 'Simple Truth Organic',
            categories: ['Produce', 'Fruits'],
          },
          {
            productId: '0001111041304',
            description: 'Ground Turkey',
            price: { regular: 4.99, promo: 3.99 },
            brand: 'Kroger',
            categories: ['Meat', 'Poultry'],
          },
        ],
      },
    },
    
    // Spoonacular API responses
    spoonacular: {
      recipes: {
        results: [
          {
            id: 716429,
            title: 'Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs',
            readyInMinutes: 45,
            servings: 2,
            cuisines: ['Mediterranean'],
            diets: ['vegetarian'],
            pricePerServing: 163.15,
          },
          {
            id: 715538,
            title: 'What to make for dinner tonight?? Bruschetta!',
            readyInMinutes: 45,
            servings: 2,
            cuisines: ['Mediterranean'],
            diets: ['vegetarian'],
            pricePerServing: 142.46,
          },
        ],
      },
      nutrition: {
        calories: 584,
        carbs: '84g',
        fat: '20g',
        protein: '19g',
        nutrients: [
          { name: 'Calories', amount: 584, unit: 'kcal' },
          { name: 'Fat', amount: 20, unit: 'g' },
          { name: 'Carbohydrates', amount: 84, unit: 'g' },
          { name: 'Protein', amount: 19, unit: 'g' },
        ],
      },
    },
    
    // OpenAI API responses
    openai: {
      mealPlan: {
        choices: [
          {
            message: {
              content: JSON.stringify({
                mealPlan: {
                  monday: {
                    breakfast: 'Oatmeal with berries',
                    lunch: 'Quinoa salad',
                    dinner: 'Grilled chicken with vegetables',
                  },
                  tuesday: {
                    breakfast: 'Greek yogurt with granola',
                    lunch: 'Lentil soup',
                    dinner: 'Salmon with rice',
                  },
                },
                totalCost: 45.50,
                culturalNotes: 'Meals adapted for halal dietary requirements',
              }),
            },
          },
        ],
      },
    },
    
    // ElevenLabs API responses
    elevenlabs: {
      voices: [
        {
          voice_id: 'voice-1',
          name: 'Sarah',
          category: 'premade',
          labels: { accent: 'american', age: 'young', gender: 'female' },
        },
        {
          voice_id: 'voice-2',
          name: 'Carlos',
          category: 'premade',
          labels: { accent: 'spanish', age: 'middle_aged', gender: 'male' },
        },
      ],
      audioGeneration: {
        audio_base64: 'mock-audio-data',
      },
    },
  },
  
  // Helper to mock successful API response
  mockSuccessResponse: (data, status = 200) => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status,
      json: async () => data,
      text: async () => JSON.stringify(data),
    })
  },
  
  // Helper to mock API error response
  mockErrorResponse: (error, status = 500) => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status,
      json: async () => ({ error }),
      text: async () => JSON.stringify({ error }),
    })
  },
  
  // Helper to mock network error
  mockNetworkError: (message = 'Network error') => {
    fetch.mockRejectedValueOnce(new Error(message))
  },
  
  // API endpoint configurations for testing
  endpoints: {
    kroger: {
      auth: 'https://api.kroger.com/v1/connect/oauth2/token',
      products: 'https://api.kroger.com/v1/products',
      locations: 'https://api.kroger.com/v1/locations',
    },
    spoonacular: {
      recipes: 'https://api.spoonacular.com/recipes/complexSearch',
      nutrition: 'https://api.spoonacular.com/recipes/{id}/nutritionWidget.json',
      mealPlan: 'https://api.spoonacular.com/mealplanner/generate',
    },
    openai: {
      chat: 'https://api.openai.com/v1/chat/completions',
    },
    elevenlabs: {
      voices: 'https://api.elevenlabs.io/v1/voices',
      textToSpeech: 'https://api.elevenlabs.io/v1/text-to-speech/{voice_id}',
    },
  },
  
  // Test scenarios for different API states
  scenarios: {
    // Rate limiting scenarios
    rateLimited: {
      status: 429,
      error: 'Rate limit exceeded',
      retryAfter: 60,
    },
    
    // Authentication scenarios
    unauthorized: {
      status: 401,
      error: 'Invalid API key',
    },
    
    // Cultural content scenarios
    culturalContent: {
      halal: {
        ingredients: ['chicken', 'rice', 'vegetables'],
        restrictions: ['no pork', 'no alcohol'],
      },
      kosher: {
        ingredients: ['beef', 'potatoes', 'herbs'],
        restrictions: ['no mixing meat and dairy', 'kosher certified'],
      },
      vegetarian: {
        ingredients: ['tofu', 'quinoa', 'vegetables'],
        restrictions: ['no meat', 'no fish'],
      },
    },
  },
  
  // Helper to test API timeout scenarios
  mockTimeout: (delay = 5000) => {
    fetch.mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, delay))
    )
  },
}