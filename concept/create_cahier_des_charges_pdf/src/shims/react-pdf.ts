/**
 * @file shims/react-pdf.ts
 * @description Point d'entrée unique vers @react-pdf/renderer.
 *
 * Toujours importer les primitives PDF depuis ce fichier et non directement
 * depuis '@react-pdf/renderer'. Cela permet de changer de lib sous-jacente
 * sans modifier les composants consommateurs.
 *
 * @example
 *   import { Document, Page, Text, View, StyleSheet } from '../../shims/react-pdf'
 */
import reactPdf from '@react-pdf/renderer'

export const {
  BlobProvider,
  Canvas,
  Circle,
  ClipPath,
  Defs,
  Document,
  Ellipse,
  Font,
  G,
  Image,
  Line,
  LinearGradient,
  Link,
  Note,
  Page,
  Path,
  PDFDownloadLink,
  PDFViewer,
  Polygon,
  Polyline,
  RadialGradient,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  Tspan,
  View,
  pdf,
  render,
  renderToBuffer,
  renderToFile,
  renderToStream,
  renderToString,
  usePDF,
  version,
} = reactPdf
