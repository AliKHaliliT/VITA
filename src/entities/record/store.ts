/**
 * The record's storage door: bundled markdown, optionally shadowed by an
 * override that a companion editing surface wrote into this browser.
 *
 * The override is another application's output, so it is validated on the way
 * in. A value that breaks the contract is reported with the key to clear and
 * the committed seed is served instead; the site never renders unchecked data.
 */

import { loadInitialData, loadSettings, seedFingerprint } from "./seed";
import { AnyContentItem, ContentType, UserSettings } from "./model";
import { validateItems, validateSettings } from "./schema";
import { safeSetItem } from "@/shared/lib";

const STORAGE_PREFIX = "os_content_";
const SETTINGS_KEY = "os_settings";
const SEED_PREFIX = "os_content_seed_";

// Once a type is saved from the admin, its localStorage copy permanently
// shadows the bundled markdown. Warn (once per type per session) when a
// redeploy has changed the markdown underneath a shadowed type, so stale
// content is at least diagnosable from the console.
const warnedStale = new Set<ContentType>();
function warnIfSeedChanged(type: ContentType) {
  const saved = localStorage.getItem(`${SEED_PREFIX}${type}`);
  if (!saved || warnedStale.has(type)) return;
  if (saved !== seedFingerprint(type)) {
    warnedStale.add(type);
    console.warn(
      `[personal-os] Bundled markdown for "${type}" changed since it was last ` +
        `edited in the admin; the localStorage copy still wins. Clear ` +
        `"${STORAGE_PREFIX}${type}" to re-seed from markdown.`
    );
  }
}

export const ContentService = {
  getAll: (type: ContentType): AnyContentItem[] => {
    try {
      const key = `${STORAGE_PREFIX}${type}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        warnIfSeedChanged(type);
        return validateItems(JSON.parse(stored), type, `localStorage "${key}"`);
      }
    } catch (e) {
      console.error(`Failed to load ${type}`, e);
    }
    return loadInitialData(type);
  },

  getSettings: (): UserSettings => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        return validateSettings(JSON.parse(stored), `localStorage "${SETTINGS_KEY}"`);
      }
    } catch (e) {
      console.error("Failed to load settings", e);
    }
    return loadSettings();
  },

  save: (type: ContentType, data: AnyContentItem[]) => {
    safeSetItem(`${STORAGE_PREFIX}${type}`, JSON.stringify(data));
    safeSetItem(`${SEED_PREFIX}${type}`, seedFingerprint(type));
  },

  saveSettings: (data: UserSettings) => {
    safeSetItem(SETTINGS_KEY, JSON.stringify(data));
  },

  downloadMarkdown: (source: AnyContentItem) => {
    const item = source as unknown as Record<string, unknown>;
    let fileContent = "---\n";
    Object.keys(item).forEach((key) => {
      if (
        key !== "body" &&
        key !== "id" &&
        key !== "type" &&
        item[key] !== undefined &&
        item[key] !== ""
      ) {
        const value = item[key];
        if (Array.isArray(value)) {
          fileContent += `${key}:\n`;
          value.forEach((v) => (fileContent += `  - ${v}\n`));
        } else {
          const safeValue =
            typeof value === "string" && value.includes(":")
              ? `"${value}"`
              : value;
          fileContent += `${key}: ${safeValue}\n`;
        }
      }
    });
    fileContent += "---\n\n";
    fileContent += item.body || "";

    const blob = new Blob([fileContent], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const filename = String(item.title || item.city || item.name || "untitled")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    link.download = `${filename}.md`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },
};
