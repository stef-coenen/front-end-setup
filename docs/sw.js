importScripts('workbox-sw.prod.v2.1.3.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "design/css/front-end-setup.css",
    "revision": "3752d4fd7cd5c7de175be89c91323f41"
  },
  {
    "url": "design/fonts/fontawesome/fontawesome-webfont.svg",
    "revision": "8ef356884e8bc0128e25921e21fab64f"
  },
  {
    "url": "design/js/applib.js",
    "revision": "25ab42e6ac9a0e731f0d5298a41ae05e"
  },
  {
    "url": "design/js/lib.js",
    "revision": "6e864be261c90f5efce9516c0ddf7cc7"
  },
  {
    "url": "index.html",
    "revision": "0d105af0b8887021a70033bbb0acd6bb"
  }
];

const workboxSW = new self.WorkboxSW();
workboxSW.precache(fileManifest);
