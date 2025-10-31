import Hero from '../Hero'
import heroImage from '@assets/generated_images/Hero_image_diverse_talented_kids_8dd4ac07.png'

export default function HeroExample() {
  return (
    <Hero
      subtitle="Welcome to Tova ku Status"
      title="Rise Above Your Status"
      description="Identifying and empowering talented kids from underprivileged schools and slums across Rwanda."
      primaryCTA={{ label: "Donate Now", href: "/get-involved" }}
      secondaryCTA={{ label: "Discover Talents", href: "/talents" }}
      backgroundImage={heroImage}
      trustIndicator="Empowering 500+ talented youth since 2020"
    />
  )
}
