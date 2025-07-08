[![banner.png](/banner.png)](https://discord.com/oauth2/authorize?client_id=1388455924510887966&permissions=8&integration_type=0&scope=applications.commands+bot)

## Introduction

Discord servers get hit by the same copy-paste scams (free Nitro, fake
airdrops, phishing links).<br> Traditional keyword filters miss obfuscated
text and require moderators to constantly delete messages. <br> **Goal: Implement a discord bot that deletes obvious harmful content and alert
mods when unsure.**


## Dataset

| stage | messages | notes |
|-------|----------|-------|
| raw dump | 80 k | skipped bots/system/stickers |
| cleaning rules | 20 k | ≥4 words, deduplication |
| manual labelling | 2 k | class balance - 13.81 % positives |

Published Hugging Face Dataset: [discord-phishing-scam](https://huggingface.co/datasets/wangyuancheng/discord-phishing-scam)


## Model & Hyper-parameter Tuning

**Base**: `distilbert-base-uncased`<br>
**Script**: `trainer/task.py`  <br>
**Platform**: `Vertex AI`<br>

### Production Hyperparameters
| learning rate | weight decay | epochs | F1 |
|----|--------------|-------|----|
| **5 e-5** | **4 e-2** | **4** | **0.955** |

## Runtime Architecture

```text
       XADD              XREAD         HTTP        HTTP          XADD            XREAD
message ──► messageStream ──► Go-worker ──► FastAPI ──► Go-worker ──► replyStream ──► action
(bot)         (Redis in)                   (/predict)                 (Redis out)     (bot)
 
