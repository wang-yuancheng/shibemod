import re

# ---------- compile once at import time ----------
# 1  discord invites
DISCORD_INV_RE = re.compile(
    r'https?://(?:www\.)?'
    r'(?:discord(?:app)?\.com/invite|discord\.gg)/[A-Za-z0-9_-]+',
    re.IGNORECASE,
)

# 2  any other web link (catch www.-style too)
GEN_URL_RE = re.compile(
    r'(?:https?://|www\.)[^\s<>{}\[\]|\\^`]+',
    re.IGNORECASE,
)

# 3  custom emoji  <a:name:id>  or  <:name:id>
CUSTOM_EMOJI_RE = re.compile(r'<a?:[^:]+:\d+>')

# 4  plain :emoji_name: — no spaces allowed inside
PLAIN_EMOJI_RE = re.compile(r':[A-Za-z0-9_~+-]+:')

# 5  user mention  <@123>  or  <@!123>
USER_RE = re.compile(r'<@!?\d+>')

# 6  collapse extra spaces later
SPACES_RE = re.compile(r'\s+')

def normalize_message(text: str) -> str:
    """Replace invites, links, emojis, user mentions with standard tags."""
    if not isinstance(text, str):
        return ""
    t = text

    # order matters, do specific before generic
    t = DISCORD_INV_RE.sub('<DISCORD_INVITE>', t)
    t = GEN_URL_RE.sub('<URL>', t)

    t = CUSTOM_EMOJI_RE.sub('<EMOJI>', t)
    t = PLAIN_EMOJI_RE.sub('<EMOJI>', t)

    t = USER_RE.sub('<USER>', t)

    # compress whitespace and strip
    t = SPACES_RE.sub(' ', t).strip()
    return t