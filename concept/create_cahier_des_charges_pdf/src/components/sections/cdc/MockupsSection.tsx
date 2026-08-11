/**
 * @file components/sections/cdc/MockupsSection.tsx
 * @description Section 7 — Aperçu des Maquettes Graphiques (Desktop & Mobile).
 */
import { Text, View, Image, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import mockupPc from '../../../assets/mockup_pc.png'
import mockupPhone from '../../../assets/mockup_phone.png'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  chapterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  chapterNumberBadge: {
    backgroundColor: colors.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  chapterNumberText: {
    color: colors.white,
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
  },
  chapterTitle: {
    fontSize: fontSizes.lg,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDeep,
  },
  chapterRule: {
    height: 2,
    backgroundColor: colors.primaryLight,
    marginBottom: spacing.md,
  },
  introNote: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
    lineHeight: 1.4,
    marginBottom: spacing.md,
  },
  mockupsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  mockupCardPc: {
    flex: 1.65,
    backgroundColor: colors.bgCard,
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.sm,
    alignItems: 'center',
  },
  mockupCardPhone: {
    flex: 1,
    backgroundColor: colors.bgCard,
    borderRadius: borders.radiusMedium,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.sm,
    alignItems: 'center',
  },
  badgeDevice: {
    backgroundColor: colors.primaryDeep,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 3,
    marginBottom: spacing.xs,
    alignSelf: 'flex-start',
  },
  badgeDeviceText: {
    fontSize: fontSizes.micro,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  imagePc: {
    width: '100%',
    height: 180,
    objectFit: 'contain',
    borderRadius: borders.radiusSmall,
  },
  imagePhone: {
    width: '100%',
    height: 180,
    objectFit: 'contain',
    borderRadius: borders.radiusSmall,
  },
  captionTitle: {
    fontSize: fontSizes.xs,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    marginTop: spacing.xs,
  },
  captionDesc: {
    fontSize: fontSizes.micro,
    fontFamily: fontFamilies.base,
    color: colors.textSubtle,
    textAlign: 'center',
    marginTop: 2,
  },
  featuresRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  featurePill: {
    flex: 1,
    backgroundColor: colors.primarySuperLight,
    borderWidth: 1,
    borderColor: colors.borderFocus,
    borderRadius: borders.radiusSmall,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    alignItems: 'center',
  },
  featureText: {
    fontSize: fontSizes.micro,
    fontFamily: fontFamilies.bold,
    color: colors.primaryDark,
    textAlign: 'center',
  },
})

export function MockupsSection() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Titre de Chapitre */}
      <View style={styles.chapterTitleRow}>
        <View style={styles.chapterNumberBadge}>
          <Text style={styles.chapterNumberText}>7</Text>
        </View>
        <Text style={styles.chapterTitle}>Maquettes & Identité Visuelle de la Plateforme</Text>
      </View>
      <View style={styles.chapterRule} />

      <Text style={styles.introNote}>
        Aperçu du design immersif conçu pour valoriser l'expérience maritime Ti'Baleine et convertir efficacement les réservations sur ordinateur et smartphone.
      </Text>

      {/* Row with Desktop and Mobile mockups */}
      <View style={styles.mockupsRow}>
        {/* Desktop PC */}
        <View style={styles.mockupCardPc}>
          <View style={styles.badgeDevice}>
            <Text style={styles.badgeDeviceText}>Interface Desktop / PC</Text>
          </View>
          <Image src={mockupPc} style={styles.imagePc} />
          <Text style={styles.captionTitle}>Vue Grand Écran — Expérience Immersive</Text>
          <Text style={styles.captionDesc}>Hero immersif, accès direct aux créneaux et sélecteur multilingue.</Text>
        </View>

        {/* Mobile Phone */}
        <View style={styles.mockupCardPhone}>
          <View style={[styles.badgeDevice, { backgroundColor: colors.primaryDark }]}>
            <Text style={styles.badgeDeviceText}>Interface Mobile / Responsive</Text>
          </View>
          <Image src={mockupPhone} style={styles.imagePhone} />
          <Text style={styles.captionTitle}>Vue Mobile & Touristes</Text>
          <Text style={styles.captionDesc}>Réservation ultra-rapide au pouce sans création de compte.</Text>
        </View>
      </View>

      {/* 3 Atouts Clés UI */}
      <View style={styles.featuresRow}>
        <View style={styles.featurePill}>
          <Text style={styles.featureText}>🌊 Univers Maritime Évocateur</Text>
        </View>
        <View style={styles.featurePill}>
          <Text style={styles.featureText}>⚡ Tunnel de Réservation Direct</Text>
        </View>
        <View style={styles.featurePill}>
          <Text style={styles.featureText}>📱 100% Adapté aux Smartphones</Text>
        </View>
      </View>
    </View>
  )
}
