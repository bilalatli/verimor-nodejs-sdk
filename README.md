# Verimor SMS SDK

**Source**: [GitHub Repository](https://github.com/bilalatli/verimor-nodejs-sdk)
**Author**: Bilal ATLI

A TypeScript SDK for the Verimor SMS API, providing an easy and efficient way to integrate SMS, IYS consent management,
and other functionalities into your applications.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Getting Started](#getting-started)
  - [Initializing the Client](#initializing-the-client)
- [Usage](#usage)
  - [Sending SMS Messages](#sending-sms-messages)
  - [Calculating SMS Credits](#calculating-sms-credits)
  - [Checking Account Balance](#checking-account-balance)
  - [Retrieving Message Status](#retrieving-message-status)
  - [Fetching Inbox Messages](#fetching-inbox-messages)
  - [Blacklist Management](#blacklist-management)
  - [IYS Integration](#iys-integration)
- [Advanced Configuration](#advanced-configuration)
  - [Proxy Settings](#proxy-settings)
- [Error Handling](#error-handling)
- [License](#license)
- [Contact](#contact)

---

## Features

- **Comprehensive API Coverage**: Access all endpoints provided by the Verimor SMS API.
- **Unified Client Interface**: Simplified usage through a single `Verimor` client.
- **IYS Integration**: Manage IYS consents and campaigns seamlessly.
- **Blacklist Management**: Easily add, retrieve, and remove blacklisted numbers.
- **Proxy Support**: Configure proxy settings for network routing.
- **TypeScript Support**: Fully typed interfaces and enums for robust development.
- **Error Handling**: Consistent and informative error responses.

---

## Installation

Install the SDK via npm:

```bash
npm install verimor-api-sdk
```

---

## Getting Started

### Initializing the Client

Import the `Verimor` client and initialize it with your API credentials:

```typescript
import { Verimor } from 'verimor-api-sdk';

const client = new Verimor('your_username', 'your_password');
```

---

## Usage

### Sending SMS Messages

Send SMS messages to one or multiple recipients.

```typescript
const smsRequest = {
  msg: 'Hello, this is a test message.',
  dest: ['905xxxxxxxxx', '905yyyyyyyyy'],
  iys_recipient_type: 'BIREYSEL',
};

client.smsApi
  .sendSms(smsRequest)
  .then((response) => {
    console.log('SMS sent successfully:', response);
  })
  .catch((error) => {
    console.error('Error sending SMS:', error);
  });
```

### Calculating SMS Credits

Calculate the number of SMS credits required for a message based on its length and character set.

```typescript
const message = 'Hello, this is a test message.';
const creditsRequired = client.smsUtils.calculateSmsCredits(message);
console.log(`Credits required: ${creditsRequired}`);
```

### Checking Account Balance

Retrieve your account's current SMS credit balance.

```typescript
client.accountApi
  .getBalance()
  .then((balance) => {
    console.log('Account balance:', balance);
  })
  .catch((error) => {
    console.error('Error fetching balance:', error);
  });
```

### Retrieving Message Status

Get the delivery status of your sent messages.

```typescript
client.messageApi
  .getMessageStatus({ id: 20121 })
  .then((statuses) => {
    statuses.forEach((status) => {
      console.log(`Message ID: ${status.message_id}, Status: ${status.status}`);
    });
  })
  .catch((error) => {
    console.error('Error fetching message status:', error);
  });
```

### Fetching Inbox Messages

Retrieve SMS messages received in your account's inbox.

```typescript
client.inboxApi
  .getInboxMessages('2023-01-01T09:00:00', '2023-01-01T12:00:00')
  .then((messages) => {
    messages.forEach((message) => {
      console.log(`From: ${message.source_addr}, Message: ${message.content}`);
    });
  })
  .catch((error) => {
    console.error('Error fetching inbox messages:', error);
  });
```

### Blacklist Management

#### Adding Numbers to the Blacklist

```typescript
client.blacklistApi
  .addNumbersToBlacklist(['905444876543', '905335876543'])
  .then((response) => {
    console.log('Numbers added to blacklist:', response);
  })
  .catch((error) => {
    console.error('Error adding numbers to blacklist:', error);
  });
```

#### Fetching Blacklisted Numbers

```typescript
client.blacklistApi
  .getBlacklistedNumbers()
  .then((data) => {
    data.records.forEach((record) => {
      console.log(`Blacklisted Number: ${record.phone}, Source: ${record.source}`);
    });
  })
  .catch((error) => {
    console.error('Error fetching blacklisted numbers:', error);
  });
```

#### Deleting Numbers from the Blacklist

```typescript
client.blacklistApi
  .deleteNumbersFromBlacklist(['905444876543', '905335876543'])
  .then((response) => {
    console.log('Numbers removed from blacklist:', response);
  })
  .catch((error) => {
    console.error('Error removing numbers from blacklist:', error);
  });
```

### IYS Integration

Manage IYS consents and campaigns.

#### Sending IYS Consents

```typescript
import {
  IysConsentType,
  IysConsentSource,
  IysConsentStatus,
  IysRecipientType,
} from 'verimor-api-sdk';

const consents = [
  {
    type: IysConsentType.MESSAGE,
    source: IysConsentSource.WEB,
    status: IysConsentStatus.APPROVED,
    recipient_type: IysRecipientType.INDIVIDUAL,
    consent_date: '2022-04-14T13:30:30',
    recipient: '905311234567',
  },
];

client.iysApi
  .sendIysConsents('BASLIGIM', consents)
  .then((campaignId) => {
    console.log('IYS consents sent, campaign ID:', campaignId);
  })
  .catch((error) => {
    console.error('Error sending IYS consents:', error);
  });
```

#### Fetching IYS Campaigns

```typescript
client.iysApi
  .getIysCampaigns()
  .then((data) => {
    data.records.forEach((campaign) => {
      console.log(`Campaign ID: ${campaign.id}, Source: ${campaign.source}`);
    });
  })
  .catch((error) => {
    console.error('Error fetching IYS campaigns:', error);
  });
```

#### Fetching IYS Consent Reports

```typescript
const campaignId = 1234;

client.iysApi
  .getIysConsentReports(campaignId)
  .then((report) => {
    console.log('IYS consent report:', report);
  })
  .catch((error) => {
    console.error('Error fetching IYS consent report:', error);
  });
```

---

## Advanced Configuration

### Proxy Settings

If you need to route API requests through a proxy server, you can configure proxy settings when initializing the client.

```typescript
import { Verimor, ProxyConfig } from 'verimor-api-sdk';

const proxyConfig: ProxyConfig = {
  host: 'proxy.example.com',
  port: 3128,
  auth: {
    username: 'proxyUser',
    password: 'proxyPass',
  },
};

const client = new Verimor('your_username', 'your_password', proxyConfig);
```

---

## Error Handling

All API methods throw an `ErrorResponse` if the API call fails. You can catch these errors to handle them appropriately.

```typescript
client.smsApi
  .sendSms(smsRequest)
  .catch((error) => {
    if (error instanceof ErrorResponse) {
      console.error('API Error:', error.message);
      console.error('Error Code:', error.code);
      console.error('Detailed Errors:', error.errors);
    } else {
      console.error('Unexpected Error:', error);
    }
  });
```

---

## License

This project is licensed under the [MIT License](LICENSE).

---
