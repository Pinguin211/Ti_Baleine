/**
 * @file components/sections/cdc/ProSection7_Mockups.tsx
 * @description Section 7 — Maquettes de l'Interface Utilisateur (Style Pro).
 */
import { Text, View, Image, StyleSheet } from '../../../shims/react-pdf'
import { colors, fontSizes, spacing, fontFamilies, borders } from '../../../styles/tokens'
import mockupPc from '../../../assets/mockup_pc.png'
import mockupPhone from '../../../assets/mockup_phone.png'

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: fontSizes.xl,
    fontFamily: fontFamilies.bold,
    color: colors.textDark,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: spacing.xs,
  },
  titleUnderline: {
    height: 1.5,
    backgroundColor: colors.primary,
    marginBottom: spacing.md,
  },
  introText: {
    fontSize: fontSizes.xs + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textBody,
    lineHeight: 1.4,
    marginBottom: spacing.md,
  },
  mockupRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  mockupCardPc: {
    flex: 1.6,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.sm,
    alignItems: 'center',
  },
  mockupCardPhone: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borders.radiusSmall,
    padding: spacing.sm,
    alignItems: 'center',
  },
  cardTagPc: {
    backgroundColor: colors.navyDark,
    borderRadius: borders.radiusSmall,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginBottom: spacing.xs,
    alignSelf: 'flex-start',
  },
  cardTagPhone: {
    backgroundColor: colors.primaryDark,
    borderRadius: borders.radiusSmall,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    marginBottom: spacing.xs,
    alignSelf: 'flex-start',
  },
  cardTagText: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.bold,
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  imgPc: {
    width: '100%',
    height: 180,
    objectFit: 'contain',
  },
  imgPhone: {
    width: '100%',
    height: 180,
    objectFit: 'contain',
  },
  caption: {
    fontSize: fontSizes.micro + 0.5,
    fontFamily: fontFamilies.base,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
})

export function ProSection7_Mockups() {
  return (
    <View style={styles.container} wrap={false}>
      {/* Titre 7 */}
      <Text style={styles.sectionTitle}>7. MAQUETTES DE L'INTERFACE UTILISATEUR</Text>
      <View style={styles.titleUnderline} />

      <Text style={styles.introText}>
        Aperçu des interfaces web conçues pour la plateforme Ti'Baleine, illustrant le parcours utilisateur sur grand écran (Desktop/PC) et sur smartphone (Mobile).
      </Text>

      <View style={styles.mockupRow}>
        {/* Mockup PC */}
        <View style={styles.mockupCardPc}>
          <View style={styles.cardTagPc}>
            <Text style={styles.cardTagText}>Interface Desktop / PC</Text>
          </View>
          <Image src={mockupPc} style={styles.imgPc} />
          <Text style={styles.caption}>Page d'accueil & tunnel de réservation — Grand écran</Text>
        </View>

        {/* Mockup Mobile */}
        <View style={styles.mockupCardPhone}>
          <View style={styles.cardTagPhone}>
            <Text style={styles.cardTagText}>Interface Mobile / Responsive</Text>
          </View>
          <Image src={mockupPhone} style={styles.imgPhone} />
          <Text style={styles.caption}>Expérience tactile optimisée pour les touristes</Text>
        </View>
      </View>
    </View>
  )
}
