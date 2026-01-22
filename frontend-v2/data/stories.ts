export interface Story {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "healthcare" | "education" | "water" | "emergency";
  featuredImage: string;
  gallery: string[];
  videoUrl?: string;
  community: string;
  amountRaised: number;
  helpersCount: number;
  impact: {
    peopleHelped: number;
    duration: string;
    metrics: string[];
  };
  author: string;
  publishedAt: Date;
  beforeAfterImages?: {
    before: string;
    after: string;
    caption: string;
  };
}

export type StoryCategory = Story["category"];

export const CATEGORY_LABELS: Record<StoryCategory | "all", string> = {
  all: "All Stories",
  healthcare: "Healthcare",
  education: "Education",
  water: "Clean Water",
  emergency: "Emergency Relief",
};

export const stories: Story[] = [
  {
    id: "kibera-clean-water",
    title: "Clean Water for 500 Families",
    excerpt:
      "A community transformed by access to safe, clean drinking water after years of struggle.",
    content: `
# A Drop of Hope in Kibera

For decades, the residents of Kibera's Eastern District faced a daily struggle that many of us take for granted: access to clean water. Mothers would wake before dawn, walking kilometers to collect water from contaminated sources. Children missed school. Waterborne diseases were rampant.

## The Challenge

The community of over 2,500 people relied on a single contaminated water point shared with livestock. During dry seasons, conflicts over water access were common. Healthcare clinics reported that over 60% of childhood illnesses were related to unsafe water.

## Ubuntu Helpers Step In

When Ubuntu Helpers learned of Kibera's water crisis, the community rallied. Within weeks, 23 helpers from across the globe contributed to fund a sustainable water solution.

## The Solution

Working with local engineers and community leaders, we installed:
- A deep borehole with solar-powered pump
- A 10,000-liter elevated storage tank
- Distribution points strategically placed throughout the community
- Water quality monitoring systems

## The Transformation

Six months later, the impact is undeniable. Waterborne diseases have dropped by 78%. Children spend an average of 2 more hours in school daily. Women have started small businesses with time previously spent collecting water.

> "Before, I would spend 4 hours every day fetching water. Now I have time to grow vegetables and my children are healthier than ever." — Mama Grace, community elder

## Sustainable Future

The community has established a water management committee. Small usage fees ensure maintenance funds are always available. Training programs teach water conservation and hygiene practices.

This is the power of Ubuntu — I am because we are.
    `.trim(),
    category: "water",
    featuredImage: "/images/stories/kibera-water.jpg",
    gallery: [
      "/images/stories/kibera-water-1.jpg",
      "/images/stories/kibera-water-2.jpg",
      "/images/stories/kibera-water-3.jpg",
      "/images/stories/kibera-water-4.jpg",
      "/images/stories/kibera-water-5.jpg",
      "/images/stories/kibera-water-6.jpg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    community: "Kibera Community, Kenya",
    amountRaised: 2500,
    helpersCount: 23,
    impact: {
      peopleHelped: 2500,
      duration: "6 months",
      metrics: [
        "78% reduction in waterborne diseases",
        "500 families with daily access to clean water",
        "2 hours saved daily per household",
        "3 new women-led businesses started",
      ],
    },
    author: "Dr. Amani Ochieng",
    publishedAt: new Date("2025-11-15"),
    beforeAfterImages: {
      before: "/images/stories/kibera-before.jpg",
      after: "/images/stories/kibera-after.jpg",
      caption:
        "The community water point before and after the Ubuntu Helpers intervention",
    },
  },
  {
    id: "lagos-mobile-clinic",
    title: "Mobile Clinic Reaches 1,000 Patients",
    excerpt:
      "Healthcare on wheels brings essential medical services to remote Lagos communities.",
    content: `
# Healthcare Without Boundaries

In the outskirts of Lagos, accessing healthcare meant a journey of hope and desperation. Many communities had never seen a doctor. Preventable diseases claimed lives that could have been saved.

## The Vision

The Ubuntu Helpers Mobile Clinic initiative was born from a simple idea: if people cannot come to healthcare, healthcare must come to them.

## Implementation

With contributions from 45 Ubuntu Helpers worldwide, we equipped a modified bus with:
- Basic diagnostic equipment
- Pharmacy supplies for 3-month rotations
- Telemedicine capabilities for specialist consultations
- Solar power for off-grid operations

## First Year Impact

The mobile clinic now visits 12 communities on a rotating schedule. In the first year alone:
- 1,000+ patients received care
- 200 children vaccinated
- 50 high-risk pregnancies monitored to safe delivery
- 30 chronic disease patients on regular management

## Stories of Hope

Mary, 45, had suffered from undiagnosed diabetes for years. "I thought I was dying slowly. The mobile clinic tested me, gave me medicine, and taught me how to manage my condition. I feel alive again."

## Looking Forward

The success has inspired plans for a second mobile unit. Community health workers are being trained to provide basic care between visits.
    `.trim(),
    category: "healthcare",
    featuredImage: "/images/stories/lagos-clinic.jpg",
    gallery: [
      "/images/stories/lagos-clinic-1.jpg",
      "/images/stories/lagos-clinic-2.jpg",
      "/images/stories/lagos-clinic-3.jpg",
      "/images/stories/lagos-clinic-4.jpg",
    ],
    community: "Greater Lagos Region, Nigeria",
    amountRaised: 8500,
    helpersCount: 45,
    impact: {
      peopleHelped: 1000,
      duration: "12 months",
      metrics: [
        "1,000+ patients treated",
        "200 children vaccinated",
        "50 safe deliveries",
        "12 communities served monthly",
      ],
    },
    author: "Nurse Funke Adeyemi",
    publishedAt: new Date("2025-10-20"),
  },
  {
    id: "cape-town-school-supplies",
    title: "Education Kits for 300 Students",
    excerpt:
      "Empowering young minds with the tools they need to succeed in their educational journey.",
    content: `
# Every Child Deserves to Learn

In the townships outside Cape Town, education is often seen as the only path out of poverty. Yet many students attend school without basic supplies — no notebooks, no pens, sometimes no shoes.

## The Need

Masiphumelele Primary School serves 800 students, many from families surviving on less than $2 per day. Teachers reported that students would share single textbooks, with some children writing on scraps of paper.

## Ubuntu Response

When educator Sarah Nkosi shared this story on the Ubuntu Helpers platform, the response was immediate. Within two weeks, 31 helpers contributed enough to provide comprehensive education kits.

## What Each Kit Contains

- Backpack with reinforced straps
- 10 exercise books
- Full stationery set
- Scientific calculator (for older students)
- Reading book appropriate to grade level
- Hygiene kit (soap, toothbrush, sanitizer)

## Distribution Day

The morning of distribution, children arrived early, their eyes bright with anticipation. As each child received their kit, cheers erupted. Some children had never owned a new backpack before.

## Academic Improvement

Three months later, teachers report:
- Class participation up 40%
- Homework completion rate improved from 45% to 89%
- Attendance improved by 15%

> "When you have your own book and pen, you feel like a real student. Now I can study at home too." — Thabo, Grade 5
    `.trim(),
    category: "education",
    featuredImage: "/images/stories/capetown-education.jpg",
    gallery: [
      "/images/stories/capetown-edu-1.jpg",
      "/images/stories/capetown-edu-2.jpg",
      "/images/stories/capetown-edu-3.jpg",
      "/images/stories/capetown-edu-4.jpg",
      "/images/stories/capetown-edu-5.jpg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    community: "Masiphumelele Township, South Africa",
    amountRaised: 3200,
    helpersCount: 31,
    impact: {
      peopleHelped: 300,
      duration: "3 months",
      metrics: [
        "300 complete education kits distributed",
        "40% increase in class participation",
        "89% homework completion rate",
        "15% improvement in attendance",
      ],
    },
    author: "Sarah Nkosi",
    publishedAt: new Date("2025-09-05"),
    beforeAfterImages: {
      before: "/images/stories/capetown-before.jpg",
      after: "/images/stories/capetown-after.jpg",
      caption: "Students before and after receiving their education kits",
    },
  },
  {
    id: "malawi-flood-relief",
    title: "Emergency Flood Relief in Malawi",
    excerpt:
      "Rapid response to devastating floods provided shelter, food, and medical care to 800 families.",
    content: `
# When Disaster Strikes, Ubuntu Responds

In March 2025, unprecedented flooding swept through southern Malawi, displacing over 100,000 people. Homes were destroyed, crops washed away, and communities left stranded.

## Immediate Response

Within 48 hours of the disaster, Ubuntu Helpers mobilized. The global community responded with urgency, with 67 helpers contributing to emergency relief efforts.

## Relief Provisions

- Emergency shelter materials for 800 families
- Clean water purification tablets (50,000 units)
- Emergency food packages for 4 weeks
- Basic medical supplies and first aid kits
- Blankets and clothing for children

## On the Ground

Working with local organizations, relief supplies reached affected communities within 5 days of the initial call. Volunteers set up distribution centers, ensuring fair and organized access to aid.

## Recovery Phase

As floodwaters receded, Ubuntu Helpers continued support:
- Seeds for replanting destroyed crops
- Tools for rebuilding homes
- School supplies so children could resume education
- Psychosocial support for trauma

## Building Resilience

The experience led to the creation of a disaster preparedness program. Communities now have emergency plans, stored supplies, and trained first responders.

> "We lost everything, but we discovered we are not alone. The world came together for us." — Chief Chilumba
    `.trim(),
    category: "emergency",
    featuredImage: "/images/stories/malawi-flood.jpg",
    gallery: [
      "/images/stories/malawi-flood-1.jpg",
      "/images/stories/malawi-flood-2.jpg",
      "/images/stories/malawi-flood-3.jpg",
      "/images/stories/malawi-flood-4.jpg",
      "/images/stories/malawi-flood-5.jpg",
      "/images/stories/malawi-flood-6.jpg",
    ],
    community: "Southern Malawi Region",
    amountRaised: 12500,
    helpersCount: 67,
    impact: {
      peopleHelped: 4000,
      duration: "3 months",
      metrics: [
        "800 families received emergency shelter",
        "4,000 people provided food security",
        "50,000 water purification tablets distributed",
        "15 communities now have disaster preparedness plans",
      ],
    },
    author: "James Phiri",
    publishedAt: new Date("2025-06-12"),
  },
  {
    id: "accra-maternal-health",
    title: "Safe Motherhood Initiative",
    excerpt:
      "Training traditional birth attendants and equipping clinics to reduce maternal mortality.",
    content: `
# Every Mother Matters

In rural communities near Accra, maternal mortality rates remained tragically high. Many women gave birth at home without trained assistance, and complications often proved fatal.

## The Challenge

- Only 2 trained midwives serving 15,000 people
- Nearest hospital 3 hours away on unpaved roads
- Traditional birth attendants (TBAs) lacked modern training
- No emergency transport available

## Ubuntu Helpers Solution

The Safe Motherhood Initiative focused on enhancing existing community resources rather than replacing them. With 38 helpers contributing, the program:

1. Trained 25 traditional birth attendants in modern techniques
2. Equipped 3 community health posts with delivery kits
3. Established an emergency transport network
4. Created a maternal health education program

## Training Program

TBAs received 6-week intensive training covering:
- Recognizing danger signs
- Clean delivery practices
- Newborn resuscitation basics
- When and how to refer to facilities
- Postpartum care essentials

## Impact After One Year

The results speak for themselves:
- Zero maternal deaths in participating communities
- 100% of high-risk cases successfully referred
- 85% of births now attended by trained personnel
- 40% increase in prenatal care visits

## Continuing the Legacy

Trained TBAs are now training others. The ripple effect means safer births for generations to come.
    `.trim(),
    category: "healthcare",
    featuredImage: "/images/stories/accra-maternal.jpg",
    gallery: [
      "/images/stories/accra-maternal-1.jpg",
      "/images/stories/accra-maternal-2.jpg",
      "/images/stories/accra-maternal-3.jpg",
      "/images/stories/accra-maternal-4.jpg",
    ],
    community: "Ga South District, Ghana",
    amountRaised: 5800,
    helpersCount: 38,
    impact: {
      peopleHelped: 850,
      duration: "12 months",
      metrics: [
        "Zero maternal deaths in program communities",
        "25 traditional birth attendants trained",
        "100% high-risk referral success rate",
        "40% increase in prenatal visits",
      ],
    },
    author: "Midwife Ama Darko",
    publishedAt: new Date("2025-08-22"),
    beforeAfterImages: {
      before: "/images/stories/accra-before.jpg",
      after: "/images/stories/accra-after.jpg",
      caption: "Community health post before and after equipment upgrade",
    },
  },
  {
    id: "nairobi-solar-school",
    title: "Solar Power Lights Up Learning",
    excerpt:
      "Renewable energy brings electricity to a rural school, extending study hours and possibilities.",
    content: `
# Illuminating the Future

Umoja Secondary School had never known the luxury of reliable electricity. Students studied by candlelight, and the computer lab sat empty with donated computers gathering dust.

## The Darkness Problem

Without electricity:
- Study hours limited to daylight
- Science experiments impossible
- Computer literacy unattainable
- Teachers struggled with lesson preparation
- Security concerns after dark

## Bringing Light

Ubuntu Helpers powered up. With 29 contributors, the solar initiative installed:
- 40 solar panels on school rooftops
- Battery storage for 8 hours of evening power
- LED lighting in all 12 classrooms
- Power outlets for the computer lab
- Security lighting for the compound

## Immediate Changes

The transformation was immediate and profound. The computer lab came alive, with students experiencing the internet for the first time. Evening study sessions became possible. Teachers could print materials and use projectors.

## Academic Advancement

One year later:
- Pass rates increased from 45% to 73%
- 100 students completed basic computer literacy
- 3 students earned university scholarships
- The school became a community charging hub

## Sustainable Model

Students formed a Green Energy Club, maintaining the solar system and educating the community about renewable energy. The school now sells excess power to nearby homes, creating a sustainable revenue stream.
    `.trim(),
    category: "education",
    featuredImage: "/images/stories/nairobi-solar.jpg",
    gallery: [
      "/images/stories/nairobi-solar-1.jpg",
      "/images/stories/nairobi-solar-2.jpg",
      "/images/stories/nairobi-solar-3.jpg",
      "/images/stories/nairobi-solar-4.jpg",
      "/images/stories/nairobi-solar-5.jpg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    community: "Umoja Village, Kenya",
    amountRaised: 7200,
    helpersCount: 29,
    impact: {
      peopleHelped: 450,
      duration: "12 months",
      metrics: [
        "Pass rates improved from 45% to 73%",
        "100 students gained computer literacy",
        "40 solar panels installed",
        "Community charging hub established",
      ],
    },
    author: "Principal Joseph Mwangi",
    publishedAt: new Date("2025-07-18"),
    beforeAfterImages: {
      before: "/images/stories/nairobi-before.jpg",
      after: "/images/stories/nairobi-after.jpg",
      caption: "The computer lab before and after solar power installation",
    },
  },
  {
    id: "dar-es-salaam-vaccination",
    title: "Childhood Vaccination Campaign",
    excerpt:
      "Reaching remote communities to protect 1,500 children against preventable diseases.",
    content: `
# Every Shot Counts

In the coastal communities near Dar es Salaam, childhood vaccination rates had fallen dangerously low. Misinformation, distance to clinics, and poverty created a perfect storm of vulnerability.

## The Health Crisis

- Only 35% of children fully vaccinated
- Recent measles outbreak claimed 12 young lives
- Parents feared vaccines due to myths
- Health workers couldn't reach remote fishing villages

## Ubuntu Response

The vaccination campaign combined community education with practical outreach. With support from 52 Ubuntu Helpers:

### Phase 1: Education
- Community health talks in local language
- Testimonials from vaccinated families
- Religious and traditional leader endorsements
- Door-to-door information sharing

### Phase 2: Outreach
- Mobile vaccination teams reached 8 islands
- Cold chain equipment kept vaccines safe
- Community volunteers helped with registration
- Follow-up reminders via mobile phones

## Campaign Results

Over 8 weeks:
- 1,500 children fully vaccinated
- 800 mothers received health education
- 95% of target population reached
- Zero adverse events reported

## Lasting Impact

Community health volunteers continue the work, tracking new births and ensuring ongoing vaccination coverage. The measles outbreak is now a memory.

> "I was afraid because of things I heard. But now I see my neighbors' vaccinated children are healthy. My children are protected now." — Fatima, mother of three
    `.trim(),
    category: "healthcare",
    featuredImage: "/images/stories/dar-vaccination.jpg",
    gallery: [
      "/images/stories/dar-vaccination-1.jpg",
      "/images/stories/dar-vaccination-2.jpg",
      "/images/stories/dar-vaccination-3.jpg",
      "/images/stories/dar-vaccination-4.jpg",
    ],
    community: "Coastal Communities, Tanzania",
    amountRaised: 4200,
    helpersCount: 52,
    impact: {
      peopleHelped: 1500,
      duration: "2 months",
      metrics: [
        "1,500 children fully vaccinated",
        "95% target population reached",
        "800 mothers received health education",
        "8 island communities served",
      ],
    },
    author: "Dr. Hassan Mbeki",
    publishedAt: new Date("2025-05-30"),
  },
  {
    id: "kampala-well-project",
    title: "Community Well Transforms Village Life",
    excerpt:
      "A single well brings clean water access to an entire village, reducing disease and empowering women.",
    content: `
# Water is Life

The village of Nakaseke had one dream: clean water close to home. For generations, women and girls walked 4 kilometers each way to fetch water from a muddy river.

## Before the Well

- 4+ hours daily spent fetching water
- High rates of typhoid and cholera
- Girls frequently missed school
- Agricultural production limited by water access

## The Project

Ubuntu Helpers funded the drilling of a deep well with:
- Professional geological survey
- 80-meter deep borehole
- Hand pump mechanism
- Concrete apron for hygiene
- Drainage system

## Community Ownership

The village formed a Water Users Committee with:
- Democratic election of leaders
- Small usage fees for maintenance fund
- Training on pump maintenance
- Women in majority leadership positions

## One Year Later

The transformation is remarkable:
- Waterborne diseases down 89%
- Girls' school attendance up 45%
- 3 new vegetable gardens flourishing
- Women's cooperative started with saved time

## Ripple Effects

Neighboring villages have approached Ubuntu Helpers, inspired by Nakaseke's success. The Water Users Committee has become a model for replication.

> "Water was our biggest burden. Now it's our biggest blessing. My daughter graduated this year — she never could have if she was still fetching water." — Maria Nakku, committee chairwoman
    `.trim(),
    category: "water",
    featuredImage: "/images/stories/kampala-well.jpg",
    gallery: [
      "/images/stories/kampala-well-1.jpg",
      "/images/stories/kampala-well-2.jpg",
      "/images/stories/kampala-well-3.jpg",
      "/images/stories/kampala-well-4.jpg",
      "/images/stories/kampala-well-5.jpg",
    ],
    community: "Nakaseke Village, Uganda",
    amountRaised: 3800,
    helpersCount: 27,
    impact: {
      peopleHelped: 1200,
      duration: "12 months",
      metrics: [
        "89% reduction in waterborne diseases",
        "45% increase in girls school attendance",
        "4 hours saved daily per household",
        "3 community vegetable gardens started",
      ],
    },
    author: "Engineer Peter Ssemwogerere",
    publishedAt: new Date("2025-04-10"),
    beforeAfterImages: {
      before: "/images/stories/kampala-before.jpg",
      after: "/images/stories/kampala-after.jpg",
      caption: "Women at the old water source vs. the new community well",
    },
  },
  {
    id: "mombasa-earthquake-relief",
    title: "Earthquake Emergency Response",
    excerpt:
      "Rapid deployment of medical teams and supplies following devastating earthquake.",
    content: `
# When the Ground Shook

A 6.2 magnitude earthquake struck the coastal region near Mombasa, causing widespread destruction. Buildings collapsed, infrastructure failed, and thousands were left homeless.

## Immediate Crisis

- 5,000+ people displaced
- Local hospital damaged and overwhelmed
- Roads blocked by debris
- Clean water systems disrupted

## Ubuntu Mobilization

Within 24 hours, Ubuntu Helpers launched an emergency response. 71 helpers contributed to fund:

### Emergency Medical Response
- Mobile medical team deployment
- Emergency surgical supplies
- Trauma care equipment
- Mental health first aid

### Shelter and Supplies
- 500 emergency tents
- 2,000 blankets
- Emergency food rations for 2 weeks
- Water purification systems

## First 72 Hours

The critical first response phase saw:
- 200 emergency surgeries performed
- 2,500 people sheltered in safe zones
- Search and rescue support for 3 collapsed buildings
- Emergency water distribution to all camps

## Recovery Phase

As the emergency phase ended, Ubuntu Helpers supported:
- Temporary school buildings
- Small business recovery grants
- Psychological support programs
- Community rebuilding efforts

## Lessons Learned

The response led to development of an emergency preparedness protocol, ensuring faster response capabilities for future disasters.
    `.trim(),
    category: "emergency",
    featuredImage: "/images/stories/mombasa-earthquake.jpg",
    gallery: [
      "/images/stories/mombasa-eq-1.jpg",
      "/images/stories/mombasa-eq-2.jpg",
      "/images/stories/mombasa-eq-3.jpg",
      "/images/stories/mombasa-eq-4.jpg",
      "/images/stories/mombasa-eq-5.jpg",
      "/images/stories/mombasa-eq-6.jpg",
    ],
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    community: "Coastal Kenya Region",
    amountRaised: 18500,
    helpersCount: 71,
    impact: {
      peopleHelped: 5000,
      duration: "3 months",
      metrics: [
        "200 emergency surgeries performed",
        "2,500 people sheltered",
        "500 emergency tents distributed",
        "5,000 people received clean water",
      ],
    },
    author: "Dr. Faith Muthoni",
    publishedAt: new Date("2025-03-25"),
  },
  {
    id: "addis-ababa-library",
    title: "Community Library Opens New Worlds",
    excerpt:
      "First public library gives children and adults access to books, computers, and educational programs.",
    content: `
# A Room Full of Dreams

In the Merkato district of Addis Ababa, children had never held a book that wasn't a shared school textbook. The concept of borrowing a book to read for pleasure was unknown.

## The Vision

Local teacher Yohannes dreamed of creating a space where knowledge could be freely shared. He connected with Ubuntu Helpers to make this dream reality.

## Building the Library

With 34 helpers contributing, the community library was established:
- Converted community hall into bright reading space
- 3,000 books in Amharic, English, and Oromo
- 10 computers with internet access
- Quiet study areas
- Children's reading corner
- Adult literacy programs

## Opening Day

Over 500 people attended the opening. Children sat in circles as volunteer readers brought stories to life. Adults signed up for computer classes. The community had a new heart.

## Programs Offered

- Daily story time for children
- Homework help club (3 days/week)
- Adult literacy classes
- Computer basics for all ages
- English language conversation groups
- Youth leadership programs

## Impact After 6 Months

- 2,000+ library cards issued
- 150 adults enrolled in literacy programs
- Children's reading levels improved significantly
- Community gathering place established
- 3 job placements through computer training

> "I learned to read at age 45 in this library. Now I read bedtime stories to my grandchildren." — Grandmother Tigist
    `.trim(),
    category: "education",
    featuredImage: "/images/stories/addis-library.jpg",
    gallery: [
      "/images/stories/addis-library-1.jpg",
      "/images/stories/addis-library-2.jpg",
      "/images/stories/addis-library-3.jpg",
      "/images/stories/addis-library-4.jpg",
    ],
    community: "Merkato District, Ethiopia",
    amountRaised: 4500,
    helpersCount: 34,
    impact: {
      peopleHelped: 2000,
      duration: "6 months",
      metrics: [
        "2,000+ library cards issued",
        "3,000 books available",
        "150 adults in literacy programs",
        "10 computers with internet access",
      ],
    },
    author: "Teacher Yohannes Bekele",
    publishedAt: new Date("2025-02-14"),
    beforeAfterImages: {
      before: "/images/stories/addis-before.jpg",
      after: "/images/stories/addis-after.jpg",
      caption: "The empty community hall transformed into a vibrant library",
    },
  },
  {
    id: "lusaka-mental-health",
    title: "Breaking the Silence on Mental Health",
    excerpt:
      "Community mental health program reduces stigma and provides support for hundreds in need.",
    content: `
# Healing Minds, Building Hope

Mental health in many African communities remains shrouded in stigma and silence. In Lusaka's dense neighborhoods, people suffered alone, afraid to speak about their struggles.

## The Hidden Crisis

- Depression and anxiety widespread but unaddressed
- Traditional beliefs often blamed mental illness on spirits
- No community-based mental health services
- People with mental illness faced discrimination

## Ubuntu Approach

Rather than imposing external solutions, Ubuntu Helpers supported a community-led mental health initiative:

### Training Phase
- 15 community health workers trained in psychological first aid
- 5 peer counselors with lived experience mentored
- Community leaders educated on mental health

### Service Delivery
- Weekly support groups established
- Home visits for severe cases
- Referral pathway to professional services
- Traditional healers engaged as partners

## Reducing Stigma

The program focused heavily on community education:
- Radio programs discussing mental health
- School awareness campaigns
- Faith leader engagement
- Public testimonials from recovered individuals

## Results After One Year

- 400 individuals received counseling support
- Stigma reduction measured in community surveys
- 3 suicide prevention interventions
- Community attitudes shifted significantly

## Sustainability

The program has been integrated into the local health system. Trained counselors continue their work, and mental health is now discussed openly.

> "For years I thought I was cursed. Now I know I have depression, and there is help. I am no longer alone." — Anonymous program participant
    `.trim(),
    category: "healthcare",
    featuredImage: "/images/stories/lusaka-mental.jpg",
    gallery: [
      "/images/stories/lusaka-mental-1.jpg",
      "/images/stories/lusaka-mental-2.jpg",
      "/images/stories/lusaka-mental-3.jpg",
      "/images/stories/lusaka-mental-4.jpg",
    ],
    community: "Kanyama Compound, Zambia",
    amountRaised: 6200,
    helpersCount: 41,
    impact: {
      peopleHelped: 400,
      duration: "12 months",
      metrics: [
        "400 individuals received counseling",
        "15 community health workers trained",
        "Stigma significantly reduced",
        "3 suicide prevention interventions",
      ],
    },
    author: "Psychologist Dr. Mwila Chanda",
    publishedAt: new Date("2025-01-20"),
  },
  {
    id: "abuja-drought-relief",
    title: "Drought Relief Saves Farming Communities",
    excerpt:
      "Emergency food aid and water trucking prevented famine in drought-stricken northern regions.",
    content: `
# When the Rains Failed

For the third consecutive year, the rains never came to northern Nigeria. Crops withered, livestock died, and families faced the specter of famine.

## The Crisis

- 3 consecutive years of drought
- 80% crop failure across the region
- Livestock dying without water or pasture
- Food prices skyrocketed beyond reach
- Children showing signs of malnutrition

## Ubuntu Helpers Response

When community leaders sent out a desperate plea, 58 Ubuntu Helpers responded with emergency drought relief:

### Immediate Relief
- Emergency food packages for 600 families
- Water trucking to 5 villages
- Nutritional supplements for children
- Veterinary care for surviving livestock

### Agricultural Recovery
- Drought-resistant seed distribution
- Water-saving irrigation equipment
- Training on climate-adaptive farming
- Small livestock restocking program

## The Long Road to Recovery

Over six months:
- Zero famine deaths in supported communities
- 600 families received food security
- 200 farmers trained in new techniques
- 50 boreholes rehabilitated

## Building Resilience

The program didn't just respond to crisis — it built capacity for future droughts:
- Community grain reserves established
- Early warning systems created
- Water harvesting infrastructure built
- Crop diversification programs launched

> "We learned that we cannot control the rain, but we can prepare for when it doesn't come. Ubuntu Helpers didn't just save us — they taught us to save ourselves." — Farmer Musa Ibrahim
    `.trim(),
    category: "emergency",
    featuredImage: "/images/stories/abuja-drought.jpg",
    gallery: [
      "/images/stories/abuja-drought-1.jpg",
      "/images/stories/abuja-drought-2.jpg",
      "/images/stories/abuja-drought-3.jpg",
      "/images/stories/abuja-drought-4.jpg",
      "/images/stories/abuja-drought-5.jpg",
    ],
    community: "Kaduna Region, Nigeria",
    amountRaised: 15000,
    helpersCount: 58,
    impact: {
      peopleHelped: 3600,
      duration: "6 months",
      metrics: [
        "Zero famine deaths in supported areas",
        "600 families received food aid",
        "200 farmers trained in adaptive techniques",
        "50 boreholes rehabilitated",
      ],
    },
    author: "Relief Coordinator Aisha Bello",
    publishedAt: new Date("2024-12-05"),
    beforeAfterImages: {
      before: "/images/stories/abuja-before.jpg",
      after: "/images/stories/abuja-after.jpg",
      caption:
        "Parched fields before drought relief and after recovery interventions",
    },
  },
];

// Calculate aggregate statistics
export const getImpactStats = () => {
  const totalLivesImpacted = stories.reduce(
    (sum, story) => sum + story.impact.peopleHelped,
    0,
  );
  const totalDonated = stories.reduce(
    (sum, story) => sum + story.amountRaised,
    0,
  );
  const totalHelpers = new Set(
    stories.flatMap((story) =>
      Array.from(
        { length: story.helpersCount },
        (_, i) => `${story.id}-helper-${i}`,
      ),
    ),
  ).size;

  return {
    livesImpacted: totalLivesImpacted,
    totalDonated,
    totalHelpers: Math.min(totalHelpers, 89), // Cap at a realistic unique helper count
  };
};

// Get story by ID
export const getStoryById = (id: string): Story | undefined => {
  return stories.find((story) => story.id === id);
};

// Get stories by category
export const getStoriesByCategory = (
  category: StoryCategory | "all",
): Story[] => {
  if (category === "all") return stories;
  return stories.filter((story) => story.category === category);
};

// Get related stories (same category, excluding current)
export const getRelatedStories = (
  storyId: string,
  limit: number = 3,
): Story[] => {
  const currentStory = getStoryById(storyId);
  if (!currentStory) return stories.slice(0, limit);

  const sameCategory = stories.filter(
    (s) => s.category === currentStory.category && s.id !== storyId,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  // Fill with other stories if not enough in same category
  const otherStories = stories.filter(
    (s) => s.category !== currentStory.category && s.id !== storyId,
  );
  return [...sameCategory, ...otherStories].slice(0, limit);
};

// Paginate stories
export const paginateStories = (
  storiesToPaginate: Story[],
  page: number,
  perPage: number = 9,
): { stories: Story[]; totalPages: number; currentPage: number } => {
  const totalPages = Math.ceil(storiesToPaginate.length / perPage);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * perPage;
  const paginatedStories = storiesToPaginate.slice(
    startIndex,
    startIndex + perPage,
  );

  return {
    stories: paginatedStories,
    totalPages,
    currentPage,
  };
};
