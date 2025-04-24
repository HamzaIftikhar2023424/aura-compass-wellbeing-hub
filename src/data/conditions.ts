
export interface Condition {
  id: string;
  name: string;
  description: string;
  symptoms: string[];
  causes: string[];
  behaviors: string[];
  coping: string[];
  icon?: string;
}

export const conditions: Condition[] = [
  {
    id: "depression",
    name: "Depression",
    description: "Depression is a mood disorder that causes a persistent feeling of sadness and loss of interest. It affects how you feel, think and behave and can lead to a variety of emotional and physical problems.",
    symptoms: [
      "Persistent sad, anxious, or 'empty' mood",
      "Feelings of hopelessness or pessimism",
      "Irritability",
      "Feelings of guilt, worthlessness, or helplessness",
      "Loss of interest or pleasure in hobbies and activities",
      "Decreased energy or fatigue",
      "Moving or talking more slowly",
      "Difficulty concentrating, remembering, or making decisions",
      "Difficulty sleeping, early-morning awakening, or oversleeping",
      "Changes in appetite or weight",
      "Thoughts of death or suicide, or suicide attempts"
    ],
    causes: [
      "Brain chemistry imbalance",
      "Hormonal changes",
      "Genetic factors",
      "Biological differences",
      "Life events (trauma, loss of a loved one, financial problems)",
      "Chronic illness or pain"
    ],
    behaviors: [
      "Social withdrawal",
      "Reduced productivity",
      "Neglect of responsibilities",
      "Self-isolation",
      "Substance abuse as self-medication"
    ],
    coping: [
      "Regular exercise",
      "Maintaining a routine",
      "Setting achievable goals",
      "Challenging negative thoughts",
      "Connecting with supportive people",
      "Pursuing activities that bring joy",
      "Professional help including therapy and possibly medication"
    ]
  },
  {
    id: "anxiety",
    name: "Anxiety Disorders",
    description: "Anxiety disorders involve excessive worry, nervousness, or fear that interferes with daily activities. This includes generalized anxiety disorder, panic disorder, and various phobia-related disorders.",
    symptoms: [
      "Excessive worry or fear",
      "Feeling restless or on-edge",
      "Being easily fatigued",
      "Difficulty concentrating",
      "Irritability",
      "Muscle tension",
      "Sleep problems",
      "Panic attacks",
      "Avoiding situations that trigger anxiety"
    ],
    causes: [
      "Genetic factors",
      "Brain chemistry",
      "Environmental stressors",
      "Personality factors",
      "Medical conditions",
      "Substance use or withdrawal"
    ],
    behaviors: [
      "Avoidance of anxiety-triggering situations",
      "Seeking reassurance excessively",
      "Perfectionism",
      "Procrastination due to fear of failure",
      "Physical manifestations (nail biting, pacing)"
    ],
    coping: [
      "Relaxation techniques (deep breathing, meditation)",
      "Regular exercise",
      "Adequate sleep",
      "Limiting caffeine and alcohol",
      "Cognitive-behavioral therapy",
      "Gradual exposure to anxiety triggers",
      "Medication when appropriate"
    ]
  },
  {
    id: "adhd",
    name: "ADHD",
    description: "Attention-deficit/hyperactivity disorder (ADHD) is a neurodevelopmental disorder characterized by inattention, hyperactivity, and impulsivity that interferes with functioning or development.",
    symptoms: [
      "Difficulty paying attention",
      "Frequently making careless mistakes",
      "Difficulty organizing tasks and activities",
      "Easily distracted",
      "Forgetfulness in daily activities",
      "Fidgeting or tapping",
      "Unable to stay seated",
      "Excessive talking",
      "Difficulty waiting one's turn",
      "Interrupting or intruding on others"
    ],
    causes: [
      "Genetic factors",
      "Brain structure and function differences",
      "Environmental factors during pregnancy (smoking, alcohol)",
      "Premature birth",
      "Low birth weight"
    ],
    behaviors: [
      "Impulsive decision making",
      "Difficulty completing tasks",
      "Poor time management",
      "Hyperfocus on interesting activities",
      "Emotional dysregulation"
    ],
    coping: [
      "Medication management",
      "Behavioral therapy",
      "Creating structured routines",
      "Breaking tasks into smaller steps",
      "Using timers and reminders",
      "Regular exercise",
      "Minimizing distractions in environment"
    ]
  },
  {
    id: "bipolar",
    name: "Bipolar Disorder",
    description: "Bipolar disorder causes dramatic shifts in a person's mood, energy, and ability to think clearly. People with this disorder experience emotional states that are intense and occur in distinct periods called 'mood episodes.'",
    symptoms: [
      "Manic episodes (abnormally elevated mood, energy)",
      "Hypomanic episodes (less severe mania)",
      "Depressive episodes",
      "Mixed episodes (features of both mania and depression)",
      "Abnormally elevated self-esteem",
      "Decreased need for sleep",
      "Racing thoughts",
      "Distractibility",
      "Increased goal-directed activity",
      "Excessive involvement in risky activities"
    ],
    causes: [
      "Genetic factors",
      "Biological differences in brain structure and function",
      "Environmental factors",
      "Stress",
      "Substance abuse"
    ],
    behaviors: [
      "Impulsive decisions during manic episodes",
      "Withdrawal during depressive episodes",
      "Erratic work performance",
      "Relationship difficulties",
      "Financial problems due to spending sprees"
    ],
    coping: [
      "Medication adherence",
      "Regular therapy",
      "Maintaining sleep schedules",
      "Monitoring mood changes",
      "Avoiding alcohol and drugs",
      "Building a support network",
      "Stress management techniques"
    ]
  },
  {
    id: "eating-disorders",
    name: "Eating Disorders",
    description: "Eating disorders are serious conditions related to persistent eating behaviors that negatively impact health, emotions, and ability to function in important areas of life.",
    symptoms: [
      "Extreme restriction of food intake",
      "Binge eating",
      "Purging behaviors (vomiting, excessive exercise)",
      "Distorted body image",
      "Intense fear of gaining weight",
      "Preoccupation with food, weight, and body shape",
      "Denial of the seriousness of low body weight",
      "Eating in secret",
      "Physical symptoms (weight fluctuations, dizziness)"
    ],
    causes: [
      "Genetic factors",
      "Psychological factors (perfectionism, body image issues)",
      "Societal pressure and cultural ideals",
      "Trauma or abuse history",
      "Family dynamics",
      "Biological factors affecting brain chemistry"
    ],
    behaviors: [
      "Ritualistic food behaviors",
      "Social isolation",
      "Hiding food or evidence of eating",
      "Excessive exercise",
      "Frequent checking of body shape/size"
    ],
    coping: [
      "Professional treatment (often multidisciplinary)",
      "Nutritional counseling",
      "Cognitive-behavioral therapy",
      "Family-based therapy",
      "Support groups",
      "Challenging distorted thoughts about food and body",
      "Developing healthy relationship with food"
    ]
  },
  {
    id: "ocd",
    name: "OCD",
    description: "Obsessive-Compulsive Disorder (OCD) features a pattern of unwanted thoughts and fears (obsessions) that lead to repetitive behaviors (compulsions). These obsessions and compulsions interfere with daily activities and cause significant distress.",
    symptoms: [
      "Unwanted, intrusive thoughts, images, or urges",
      "Excessive concern with order, symmetry, or precision",
      "Fear of contamination",
      "Uncertainty about having completed tasks correctly",
      "Aggressive or horrific thoughts about harming yourself or others",
      "Compulsive checking behaviors",
      "Excessive cleaning or handwashing",
      "Ordering and arranging things in a particular way",
      "Repeatedly reviewing or redoing things",
      "Mental rituals like counting or repeating words"
    ],
    causes: [
      "Genetic factors",
      "Brain structure and functioning",
      "Environment (childhood trauma or abuse)",
      "Learned behaviors",
      "Stress triggers"
    ],
    behaviors: [
      "Time-consuming rituals",
      "Avoidance of triggering situations",
      "Seeking reassurance",
      "Rigid routines",
      "Difficulty with uncertainty"
    ],
    coping: [
      "Exposure and Response Prevention therapy",
      "Cognitive-behavioral therapy",
      "Medication (often SSRIs)",
      "Mindfulness practices",
      "Stress management techniques",
      "Building tolerance for anxiety and uncertainty",
      "Support groups"
    ]
  },
  {
    id: "ptsd",
    name: "PTSD",
    description: "Post-Traumatic Stress Disorder (PTSD) is a condition that may develop after experiencing or witnessing a traumatic event. It involves intrusive memories, avoidance behaviors, negative changes in thinking and mood, and changes in physical and emotional reactions.",
    symptoms: [
      "Intrusive memories of the traumatic event",
      "Flashbacks",
      "Nightmares",
      "Emotional distress or physical reactions to reminders",
      "Avoiding thinking or talking about the trauma",
      "Avoiding places, activities, or people related to the trauma",
      "Negative thoughts about yourself or the world",
      "Hopelessness about the future",
      "Difficulty maintaining relationships",
      "Being easily startled",
      "Trouble sleeping or concentrating"
    ],
    causes: [
      "Experiencing or witnessing traumatic events",
      "Combat exposure",
      "Childhood abuse",
      "Sexual violence",
      "Physical assault",
      "Accidents or natural disasters",
      "Genetic predisposition to anxiety or depression"
    ],
    behaviors: [
      "Hypervigilance",
      "Emotional numbness",
      "Aggressive behavior",
      "Self-destructive behavior",
      "Social isolation"
    ],
    coping: [
      "Trauma-focused cognitive behavioral therapy",
      "Eye Movement Desensitization and Reprocessing (EMDR)",
      "Medication",
      "Support groups",
      "Physical activity",
      "Mindfulness and relaxation techniques",
      "Establishing safety and routine"
    ]
  },
  {
    id: "self-harm",
    name: "Self-Harm & Suicidal Ideation",
    description: "Self-harm involves deliberate injury to oneself without suicidal intent, while suicidal ideation refers to thoughts about or preoccupation with suicide. Both are serious conditions requiring immediate attention and care.",
    symptoms: [
      "Unexplained cuts, burns, bruises",
      "Wearing long sleeves or pants even in warm weather",
      "Statements of hopelessness or worthlessness",
      "Preoccupation with death",
      "Talking about wanting to die",
      "Giving away possessions",
      "Social withdrawal",
      "Increased substance use",
      "Mood swings",
      "Saying goodbye to people"
    ],
    causes: [
      "Mental health conditions (depression, anxiety, PTSD)",
      "Trauma or abuse",
      "Bullying",
      "Substance abuse",
      "Social isolation",
      "Genetic factors",
      "Family history of suicide"
    ],
    behaviors: [
      "Self-injury (cutting, burning, hitting)",
      "Reckless behavior",
      "Researching suicide methods",
      "Creating a plan for suicide",
      "Making final arrangements"
    ],
    coping: [
      "Immediate professional help (crisis lines, emergency services)",
      "Safety planning",
      "Removing access to means of self-harm",
      "Regular therapy",
      "Medication when appropriate",
      "Dialectical Behavior Therapy",
      "Building a support network",
      "Developing healthy coping skills"
    ]
  }
];

export default conditions;
