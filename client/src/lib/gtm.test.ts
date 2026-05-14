import { afterEach, describe, expect, it, vi } from "vitest";

import { ensureGtm } from "./gtm";

function createFakeDocument() {
  const createdElements: Array<Record<string, unknown>> = [];
  const headChildren: Array<Record<string, unknown>> = [];
  const bodyChildren: Array<Record<string, unknown>> = [];

  return {
    createdElements,
    headChildren,
    bodyChildren,
    document: {
      createElement(tagName: string) {
        const element: Record<string, unknown> = {
          tagName: tagName.toUpperCase(),
          style: {},
          appendChild(child: Record<string, unknown>) {
            element.child = child;
          },
        };
        createdElements.push(element);
        return element;
      },
      head: {
        appendChild(element: Record<string, unknown>) {
          headChildren.push(element);
          return element;
        },
      },
      body: {
        prepend(element: Record<string, unknown>) {
          bodyChildren.unshift(element);
          return element;
        },
      },
    },
  };
}

describe("ensureGtm", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("loads Google Tag Manager through Partytown and notifies dynamic script updates", () => {
    const fakeDocument = createFakeDocument();
    const dispatchEvent = vi.fn();

    vi.stubGlobal("document", fakeDocument.document);
    vi.stubGlobal("window", {
      dataLayer: [],
      dispatchEvent,
    });
    vi.stubGlobal(
      "CustomEvent",
      class CustomEvent {
        type: string;

        constructor(type: string) {
          this.type = type;
        }
      }
    );

    ensureGtm();

    const gtmScript = fakeDocument.headChildren.find(element =>
      String(element.src).includes("googletagmanager.com/gtm.js")
    );

    expect(gtmScript).toMatchObject({
      async: true,
      type: "text/partytown",
      src: "https://www.googletagmanager.com/gtm.js?id=GTM-M4CHW3MC",
    });
    expect(window.dataLayer).toContainEqual({
      "gtm.start": expect.any(Number),
      event: "gtm.js",
    });
    expect(dispatchEvent).toHaveBeenCalledWith(
      expect.objectContaining({ type: "ptupdate" })
    );
  });
});
