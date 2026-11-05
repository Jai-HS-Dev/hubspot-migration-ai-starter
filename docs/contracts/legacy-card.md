# Legacy Card Example Contract

The adapter transforms a synthetic legacy definition/response into a UI-neutral
view model. It does not produce HubSpot card metadata or migrate customer views.

Supported: title, result IDs, result titles, optional HTTPS links without query
strings/credentials/fragments, and declared plain STRING properties. Missing values
become empty strings. Duplicate IDs, unsafe URLs, other data types and legacy
actions are rejected instead of silently losing behavior.

The modern model contains state, title, items, actions=[] and liveWritesEnabled=false.
Render its text with normal escaped UI components, not injected HTML. UI component
layout, settings, iframes, dynamic legacy titles and other behaviors need explicit
mapping with the official converter and current UI extension documentation.

## Action Compatibility Example

normalizeActionPayload accepts bounded JSON or URL-encoded business fields:
associatedObjectId, associatedObjectType and actionKey. It rejects unexpected fields,
duplicate form fields, unsafe keys and unsupported types. This is not the full
legacy request schema. JSON parsing uses the standard parser; do not assume it
detects duplicate JSON keys.

The parser does not authenticate or execute an action. A real adapter must verify
the correct HubSpot signature over the original request before normalization and
derive account/app/user identity from trusted context. Caller identity fields are
intentionally not accepted. Keep old form and new JSON contracts during a measured
transition only if the real app needs them. Test GET/query behavior separately.

No URLs in the input are fetched. No action hooks, API writes or credential
operations are implemented by this example.
