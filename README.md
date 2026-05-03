# Smart ATM Routing System

## Idea Summary

The Smart ATM Routing System helps customers find the nearest **usable ATM**, not just the nearest ATM by location. It checks ATM availability, cash level, supported services, and customer location before recommending the best option.

## Real-World Problem

Customers often go to the closest ATM and discover that it is out of service, out of cash, under maintenance, or does not support the required transaction such as deposit or currency exchange. This wastes time, creates frustration, increases complaints, and reduces trust in digital banking services.

## Proposed Solution

The system receives the customer’s location and required service, then filters ATMs based on real availability. It excludes unavailable machines and recommends the nearest ATM that can actually perform the requested transaction.

## Example Scenario

A customer wants to withdraw **5,000 EGP**.  
The closest ATM is 500 meters away but only has 1,000 EGP available.  
Instead of sending the customer there, the system recommends another ATM that is slightly farther but online and has enough cash.

## MVP Scope

The MVP will use simulated ATM data and include:

- ATM database with location, status, cash level, and services
- Admin APIs to add/update ATMs
- Customer API to request nearest usable ATM
- Filtering by service type and cash availability
- Distance calculation
- Recommended ATM plus alternatives
- Basic search history/logging

## MVP Flow

1. Customer sends location, service type, amount, and search radius.
2. Backend searches nearby ATMs.
3. System removes offline, maintenance, or unsupported ATMs.
4. If withdrawal is requested, system checks cash level.
5. System calculates distance and returns the nearest valid ATM.

## Core Business Rules

- Offline ATMs are not recommended.
- Maintenance ATMs are not recommended.
- ATM must support the requested service.
- For withdrawals, ATM cash must be enough for the requested amount.
- The nearest valid ATM is returned as the recommendation.

## Example API Request

```json
{
  "latitude": 30.0444,
  "longitude": 31.2357,
  "serviceType": "WITHDRAWAL",
  "amount": 5000,
  "radiusKm": 5
}
```

## Example API Response

```json
{
  "recommendedATM": {
    "name": "NBE Tahrir ATM",
    "address": "Tahrir Square, Cairo",
    "distanceKm": 1.2,
    "status": "ONLINE",
    "cashLevelStatus": "SUFFICIENT",
    "services": ["WITHDRAWAL", "DEPOSIT"]
  },
  "alternatives": [
    {
      "name": "NBE Garden City ATM",
      "distanceKm": 2.3,
      "status": "ONLINE"
    }
  ]
}
```

## Future Enhancements

- Real ATM network integration
- SMS or push notifications
- Map integration
- AI assistant for natural language search
- RAG-based explanation for recommendations
- Predictive cash shortage alerts
- ATM failure prediction
- Demand heatmaps

## Final Summary

This MVP solves a clear banking problem by guiding customers to ATMs that are actually working and suitable for their requested service. It can start with simple backend APIs and simulated data, then grow into a real-time intelligent ATM recommendation platform.
