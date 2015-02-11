
# analytics-detective

Detect which integrations a website is using and find their API keys.

## Usage

Make requests to `detective.segment.com/?url=<url>`

Example response:

```json
{
  "integrations": [
    {
      "name": "Google Analytics",
      "key": "UA-5484921-8"
    },
    {
      "name": "Mixpanel",
      "key": "89f86c4aa2ce5b74cb47eb5ec95ad1f9"
    }
  ]
}
```