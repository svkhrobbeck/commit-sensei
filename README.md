# Commit Sensei 🤖

[uzbek description](README_UZ.md)

**Commit Sensei** is a Telegram-based discipline and motivation bot
designed to force one simple habit: **write commits to your personal
GitHub projects every single day.**

No scrolling. No excuses. Just execution.

------------------------------------------------------------------------

## 🎯 Core Idea

Commit Sensei solves a common developer problem:

-   Starting personal projects and abandoning them
-   Going days (or weeks) without commits
-   Relying on motivation instead of systems

The bot **only counts commits made to repositories you personally own**.

-   Collaborator commits → **ignored**
-   Organization repos → **ignored**
-   Only owner-level repositories count

This design intentionally pushes developers to grow their **own
portfolio**, not someone else's.

------------------------------------------------------------------------

## ⚙️ How It Works

1.  User joins the Telegram bot
2.  Connects their GitHub account
3.  Sets a daily commit target\
    Examples:
    -   7 commits/day → 49 commits/week
    -   12 commits/day → 84 commits/week
4.  The bot tracks activity daily and weekly

Everything is automated. No manual input. No cheating.

------------------------------------------------------------------------

## 🧮 Penalty System (The Real Discipline)

If a user **fails to reach the daily target**:

-   Missing commits are recorded as **penalty**
-   Penalties are transferred to the next week
-   Penalties are evenly distributed across 7 days
-   Any remainder is added to **Monday**

### Example

-   Daily target: 12 commits\
-   Commits written today: 5\
-   Missing commits: 7

Next week: - 7 ÷ 7 = +1 commit/day - New daily target: **13
commits/day**

Penalties stack until fully repaid.

No mercy. No resets.

------------------------------------------------------------------------

## ⏰ Reminder System (5 Layers)

### 1️⃣ Morning Reminder --- 07:00

-   Today's required commit count
-   Includes penalties (if any)

### 2️⃣ Afternoon Reminder --- 14:00

-   Commits written so far today
-   Remaining commits to hit the target

### 3️⃣ Evening Reminder --- 20:00

-   4 hours left until day ends
-   Praise if target is completed
-   Warning if still behind

### 4️⃣ Night Summary --- 23:58

-   Daily activity summary
-   Success or failure confirmation
-   Penalties calculated and stored
-   Sent to:
    -   the user directly
    -   or a configured Telegram channel

### 5️⃣ Weekly Summary --- Sunday 23:58

-   Total commits for the week
-   Total penalties accumulated
-   Motivation for next week
-   System & database reset for the new cycle

------------------------------------------------------------------------

## 🔐 Strict Rules

-   Only **repository owner** commits count
-   Collaboration commits are ignored
-   All **7 days matter**
-   Missing even one day triggers penalties

This is not a streak toy.\
This is a commitment contract.

------------------------------------------------------------------------

## 🧠 Why Commit Sensei Works

-   Zero fake activity
-   Pure GitHub data
-   Real accountability
-   Portfolio-driven growth
-   Discipline over motivation

Commit Sensei moves you from: \> "I'll code when I feel like it"\
to\
\> "I must code today."

------------------------------------------------------------------------

## 🛠 Tech Stack

-   Telegram Bot API
-   GitHub REST & GraphQL APIs
-   TypeScript
-   Node.js / Bun
-   Cron-based scheduler
-   Custom penalty engine

------------------------------------------------------------------------

## 🚀 Roadmap

-   Streak tracking
-   Public leaderboards
-   Web dashboard
-   Repo-level analytics
-   AI-based commit quality insights

------------------------------------------------------------------------

## 📌 Final Words

Commit Sensei is not a friendly reminder.

It is a **daily enforcement system for developers who want real
progress**.

If you are serious about your personal projects ---\
**Commit Sensei will not let you disappear.**
