import TalentCard from '../TalentCard'
import talentImage from '@assets/generated_images/Talented_girl_with_violin_portrait_f9f1e1a7.png'

export default function TalentCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      <TalentCard
        id="1"
        name="Amani Grace"
        age={12}
        talentType="Music"
        description="Amani has been playing violin for 3 years and dreams of performing in international orchestras. Her dedication and natural talent shine through every performance."
        imageUrl={talentImage}
      />
      <TalentCard
        id="2"
        name="David Kwame"
        age={14}
        talentType="Sports"
        description="An exceptional football player with incredible speed and technique. David aspires to play professionally and represent his country on the world stage."
        imageUrl={talentImage}
      />
      <TalentCard
        id="3"
        name="Sarah Nkunda"
        age={11}
        talentType="Art"
        description="Sarah's vibrant paintings capture the beauty of her community. She uses art as a powerful medium to tell stories and inspire others."
        imageUrl={talentImage}
      />
    </div>
  )
}
