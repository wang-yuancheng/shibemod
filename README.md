[![banner.png](/banner.png)](https://discord.com/oauth2/authorize?client_id=1388455924510887966&permissions=8&integration_type=0&scope=applications.commands+bot)

## Introduction

Discord servers get hit by the same copy-paste scams (free Nitro, fake
airdrops, phishing links).<br> Traditional keyword filters miss obfuscated
text and require moderators' constant attention to remove them. <br> Hence, we
built a lightweight Discord moderation bot that can filter common scam messages.

## Bot Status 
**⚠️ This bot is now offline.**

Due to the ongoing cost of hosting, the service was discontinued in **July 2026**.

❤️ Thank you to everyone who supported the project. ❤️

## Tech Stack
![My Skills](https://skillicons.dev/icons?i=ts,go,python,fastapi,pytorch,redis,docker,aws,gcp)


## Dataset
Using a simple python script, discord chat logs were pulled and cleaned. <br><br>
Raw: [discord-phishing-scam](https://huggingface.co/datasets/wangyuancheng/discord-phishing-scam)<br>
Clean: [discord-phishing-scam-clean](https://huggingface.co/datasets/wangyuancheng/discord-phishing-scam-clean)

## Model Design and Operational Behavior
### Architecture and Training Approach
We employ a DistilBERT-based classifier optimized for real-time inference, prioritizing precision during model training to minimize false positives. To mitigate overfitting, we apply regex masking to high-variance entities such as links and mentions, compelling the model to learn deep semantic patterns rather than memorizing surface-level keywords. We also incorporate legitimate messages containing typical scam terminology into the training set to improve contextual discrimination. By applying a softmax function with a strict confidence threshold (≥0.95), we ensure only highly probable scams are removed, thus ensuring undisturbed user experience and protecting legitimate content.

### Operational Constraints
The model may inadvertently flag legitimate advertisements or discussions regarding crypto, finance, and transactions due to overfitting on these high-risk keywords. Furthermore, as an NLP-based system analyzing messages in isolation, it currently cannot interpret sarcasm, image-based content, or complex social engineering attacks distributed across multiple messages.

## Usage

### Invite Link

To add the bot to your server with the necessary permissions (Administrator), click the link below:
[**Invite ShibeMod**](https://discord.com/oauth2/authorize?client_id=1388455924510887966&permissions=8&integration_type=0&scope=applications.commands+bot)

### Bot Commands

  * `/activate` — Sets the current channel as the **Moderation Log**. The bot will send alerts for deleted or flagged messages here.
  * `/ignore` — Toggles scanning for the current channel. Use this to whitelist channels where strict moderation isn't required (e.g., admin-only channels).
  * `/help` — Displays a list of available commands and instructions.

### To Deploy Locally

You can run the full stack (Bot, Inference API, Redis, and Pipeline) locally using Docker.

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/wang-yuancheng/shibemod.git
    cd shibemod/moderationbot
    ```

2.  **Configure Environment Variables:**
    Create the following `.env` files as referenced in `docker-compose.yml`:

    **`discordbot/.env`**

    ```env
    BOT_TOKEN=your_discord_bot_token
    REDIS_URL=redis://redis:6379
    ```

    **`pipeline/.env`**

    ```env
    REDIS_URL=redis://redis:6379
    FASTAPI_URL=http://inferenceapi:8000
    ```

3.  **Run with Docker Compose:**

    ```bash
    docker-compose up --build
    ```

    This will start the Discord bot listener, the FastAPI inference engine, and the Redis pipeline.

## Runtime Architecture

```text
       XADD              XREAD         HTTP        HTTP          XADD            XREAD
message ──► messageStream ──► Go-worker ──► FastAPI ──► Go-worker ──► replyStream ──► action
(bot)         (Redis in)                   (/predict)                 (Redis out)     (bot)
 
