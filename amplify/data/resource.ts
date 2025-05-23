import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Restaurant: a
    .model({
      name: a.string(),
      cuisine: a.string(),
      category: a.string(),
      priceRange: a.string(),
      lat: a.float(),       
      lng: a.float(),
      rating: a.float(),
      aestheticRating: a.float(),
      tasteRating: a.float(),
      image: a.string(),
      address: a.string(),
      openingHours: a.string(),
      contactNumber: a.string(),
      description: a.string(),
      features: a.string(),
      area: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["read"])]),

  Reservation: a
    .model({
      userId: a.string(),
      restaurantId: a.string(),
      date: a.string(),
      time: a.string(),
      guests: a.integer(),
      specialRequests: a.string(),
      status: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["read", "create"])]),

    Favorite: a
    .model({
      userId: a.string(),
      restaurantId: a.string(),
    })
    .authorization((allow) => [allow.publicApiKey().to(["read", "create"])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
