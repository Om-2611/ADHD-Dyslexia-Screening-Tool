import { QuestionCategory } from "../types/questionTypes";

export const adhdCategories: QuestionCategory[] = [
    {
        id: 'predominantly_inattentive',
        name: 'Predominantly Inattentive',
        description: 'Symptoms primarily related to inattention, such as difficulty focusing, forgetfulness, and disorganization.',
        behavioralQuestions: [
            {
                id: 'PI-1',
                text: 'Does not pay attention to details or makes careless mistakes, such as in homework',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-2',
                text: 'Has difficulty sustaining attention to tasks or activities',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-3',
                text: 'Does not seem to listen when spoken to directly',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-4',
                text: 'Does not follow through on instruction and fails to finish schoolwork (not due to oppositional behavior or failure to understand)',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-5',
                text: 'Has difficulty organizing tasks and activities',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-6',
                text: 'Avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-7',
                text: 'Loses things necessary for tasks or activities (school assignments, pencils, or books)',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-8',
                text: 'Is easily distracted by extraneous stimuli',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PI-9',
                text: 'Is forgetful in daily activities',
                subcategory: 'Predominantly Inattentive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
        ],
        performanceQuestions: [
            {
                id: 'PI-Perf-1',
                text: 'Performance in Reading',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PI-Perf-2',
                text: 'Performance in Mathematics',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PI-Perf-3',
                text: 'Performance in Written expression',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PI-Perf-4',
                text: 'Relationships with peers',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PI-Perf-5',
                text: 'Following directions/rules',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PI-Perf-6',
                text: 'Disrupting class',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PI-Perf-7',
                text: 'Assignment completion',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PI-Perf-8',
                text: 'Organizational skills',
                subcategory: 'Predominantly Inattentive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
        ]
    },
    {
        id: 'predominantly_hyperactive',
        name: 'Predominantly Hyperactive',
        description: 'Symptoms primarily related to hyperactivity and impulsivity, such as fidgeting, difficulty staying seated, and interrupting others.',
        behavioralQuestions: [
            {
                id: 'PH-1',
                text: 'Fidgets with hands or feet or squirms in seat',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-2',
                text: 'Leaves seat when remaining seated is expected',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-3',
                text: 'Runs about or climbs excessively in situations where it is inappropriate (in adolescents or adults, may be limited to subjective feelings of restlessness)',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-4',
                text: 'Has difficulty playing or engaging in leisure activities quietly',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-5',
                text: 'Is often "on the go" or acts as if "driven by a motor"',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-6',
                text: 'Often talks excessively',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-7',
                text: 'Often blurts out answers before questions have been completed',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-8',
                text: 'Has difficulty waiting his or her turn',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'PH-9',
                text: 'Often interrupts or intrudes on others (butts into conversations or games)',
                subcategory: 'Predominantly Hyperactive',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
        ],
        performanceQuestions: [
            {
                id: 'PH-Perf-1',
                text: 'Performance in Reading',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PH-Perf-2',
                text: 'Performance in Mathematics',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PH-Perf-3',
                text: 'Performance in Written expression',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PH-Perf-4',
                text: 'Relationships with peers',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PH-Perf-5',
                text: 'Following directions/rules',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PH-Perf-6',
                text: 'Disrupting class',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PH-Perf-7',
                text: 'Assignment completion',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'PH-Perf-8',
                text: 'Organizational skills',
                subcategory: 'Predominantly Hyperactive',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
        ]
    },
    {
        id: 'combined_type',
        name: 'Combined Type',
        description: 'Meeting criteria for both inattention and hyperactivity-impulsivity.',
        behavioralQuestions: [
            { id: 'CT-1', text: 'Combines symptoms of both inattention and hyperactivity/impulsivity', subcategory: 'Combined Type', type: 'behavioral', options: [{ text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 }] },
        ],
        performanceQuestions: [
            { id: 'CT-Perf-1', text: 'Overall academic performance', subcategory: 'Combined Type', type: 'performance', options: [{ text: '1- very problematic', score: 1 }, { text: '2- problematic', score: 1 }, { text: '3- below average', score: 0 }, { text: '4- average', score: 0 }, { text: '5- good', score: 0 }] },
        ]
    },
    {
        id: 'other_specified_adhd',
        name: 'Other Specified ADHD',
        description: 'Symptoms characteristic of ADHD that cause clinically significant distress or impairment but do not meet the full criteria for ADHD.',
        behavioralQuestions: [
            { id: 'OSA-1', text: 'Presents with symptoms of ADHD that do not meet full criteria', subcategory: 'Other Specified ADHD', type: 'behavioral', options: [{ text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 }] },
        ],
        performanceQuestions: [
            { id: 'OSA-Perf-1', text: 'Impact on daily functioning', subcategory: 'Other Specified ADHD', type: 'performance', options: [{ text: '1- very problematic', score: 1 }, { text: '2- problematic', score: 1 }, { text: '3- below average', score: 0 }, { text: '4- average', score: 0 }, { text: '5- good', score: 0 }] },
        ]
    },
    {
        id: 'unspecified_adhd',
        name: 'Unspecified ADHD',
        description: 'Symptoms characteristic of ADHD that cause clinically significant distress or impairment but do not meet the full criteria for ADHD. Used in situations where the clinician chooses not to specify the reason that the criteria are not met.',
        behavioralQuestions: [
            { id: 'UA-1', text: 'Symptoms of ADHD are present but not fully specified', subcategory: 'Unspecified ADHD', type: 'behavioral', options: [{ text: 'Never', score: 0 }, { text: 'Occasionally', score: 0 }, { text: 'Often', score: 1 }, { text: 'Very Often', score: 1 }] },
        ],
        performanceQuestions: [
            { id: 'UA-Perf-1', text: 'Overall impact on life', subcategory: 'Unspecified ADHD', type: 'performance', options: [{ text: '1- very problematic', score: 1 }, { text: '2- problematic', score: 1 }, { text: '3- below average', score: 0 }, { text: '4- average', score: 0 }, { text: '5- good', score: 0 }] },
        ]
    },
    {
        id: 'anxiety_disorder',
        name: 'Anxiety Disorder',
        description: 'Excessive and persistent worry and fear about everyday situations.',
        behavioralQuestions: [
            {
                id: 'AD-1',
                text: 'Is excessively worried about school performance',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-2',
                text: 'Is excessively worried about future events',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-3',
                text: 'Is excessively worried about fitting in with peers',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-4',
                text: 'Is excessively worried about family matters',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-5',
                text: 'Is excessively worried about their own physical health',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-6',
                text: 'Is excessively worried about their safety or the safety of others',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-7',
                text: 'Is excessively worried about social situations',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-8',
                text: 'Is excessively worried about making mistakes',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'AD-9',
                text: 'Is excessively worried about being perfect',
                subcategory: 'Anxiety Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
        ],
        performanceQuestions: [
            {
                id: 'AD-Perf-1',
                text: 'Performance in Reading',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'AD-Perf-2',
                text: 'Performance in Mathematics',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'AD-Perf-3',
                text: 'Performance in Written expression',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'AD-Perf-4',
                text: 'Relationships with peers',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'AD-Perf-5',
                text: 'Following directions/rules',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'AD-Perf-6',
                text: 'Disrupting class',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'AD-Perf-7',
                text: 'Assignment completion',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
            {
                id: 'AD-Perf-8',
                text: 'Organizational skills',
                subcategory: 'Anxiety Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
        ]
    },
    {
        id: 'odd',
        name: 'Oppositional Defiant Disorder',
        description: 'A pattern of negativistic, hostile, or defiant behavior lasting at least 6 months.',
        behavioralQuestions: [
            {
                id: 'odd_1',
                text: 'Often loses temper',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'odd_2',
                text: 'Is often touchy or easily annoyed by others',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'odd_3',
                text: 'Is often angry and resentful',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'odd_4',
                text: 'Often argues with authority figures or, for children and adolescents, with adults',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'odd_5',
                text: 'Often actively defies or refuses to comply with requests from authority figures or with rules',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'odd_6',
                text: 'Often deliberately annoys others',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'odd_7',
                text: 'Often blames others for his or her mistakes or misbehavior',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'odd_8',
                text: 'Has been spiteful or vindictive at least twice during the past 6 months',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            }
        ],
        performanceQuestions: [
            {
                id: 'odd_perf_1',
                text: 'Performance in Reading',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 }
                ]
            },
            {
                id: 'odd_perf_2',
                text: 'Performance in Mathematics',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 }
                ]
            },
            {
                id: 'odd_perf_3',
                text: 'Performance in Written expression',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 }
                ]
            },
            {
                id: 'odd_perf_4',
                text: 'Relationships with peers',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 }
                ]
            },
            {
                id: 'odd_perf_5',
                text: 'Following directions/rules',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 }
                ]
            },
            {
                id: 'odd_perf_6',
                text: 'Disrupting class',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 }
                ]
            },
            {
                id: 'odd_perf_7',
                text: 'Organizational skills',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 }
                ]
            }
        ]
    },
    {
        id: 'conduct_disorder',
        name: 'Conduct Disorder',
        description: 'A pattern of behavior that violates the basic rights of others or major age-appropriate societal norms or rules.',
        behavioralQuestions: [
            {
                id: 'cd_1',
                text: 'Often bullies, threatens, or intimidates others',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_2',
                text: 'Often initiates physical fights',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_3',
                text: 'Has used a weapon that can cause serious physical harm to others',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_4',
                text: 'Has been physically cruel to people',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_5',
                text: 'Has been physically cruel to animals',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_6',
                text: 'Has stolen while confronting a victim',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_7',
                text: 'Has forced someone into sexual activity',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_8',
                text: 'Has deliberately engaged in fire setting with the intention of causing serious damage',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_9',
                text: 'Has deliberately destroyed others\' property',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_10',
                text: 'Has broken into someone else\'s house, building, or car',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_11',
                text: 'Often lies to obtain goods or favors or to avoid obligations',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_12',
                text: 'Has stolen items of nontrivial value without confronting a victim',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_13',
                text: 'Often stays out at night despite parental prohibitions',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_14',
                text: 'Has run away from home overnight at least twice',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            },
            {
                id: 'cd_15',
                text: 'Is often truant from school',
                subcategory: 'Conduct Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 }
                ]
            }
        ],
        performanceQuestions: [
            {
                id: 'cd_perf_1',
                text: 'How often does the child engage in aggressive behavior towards others?',
                subcategory: 'Conduct Disorder',
                type: 'performance',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Rarely', score: 1 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Often', score: 3 }
                ]
            },
            {
                id: 'cd_perf_2',
                text: 'How often does the child destroy property?',
                subcategory: 'Conduct Disorder',
                type: 'performance',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Rarely', score: 1 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Often', score: 3 }
                ]
            },
            {
                id: 'cd_perf_3',
                text: 'How often does the child steal or lie?',
                subcategory: 'Conduct Disorder',
                type: 'performance',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Rarely', score: 1 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Often', score: 3 }
                ]
            },
            {
                id: 'cd_perf_4',
                text: 'How often does the child violate rules or curfews?',
                subcategory: 'Conduct Disorder',
                type: 'performance',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Rarely', score: 1 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Often', score: 3 }
                ]
            },
            {
                id: 'cd_perf_5',
                text: 'How often does the child show remorse for their actions?',
                subcategory: 'Conduct Disorder',
                type: 'performance',
                options: [
                    { text: 'Always', score: 0 },
                    { text: 'Usually', score: 1 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Never', score: 3 }
                ]
            },
            {
                id: 'cd_perf_6',
                text: 'How often does the child show empathy towards others?',
                subcategory: 'Conduct Disorder',
                type: 'performance',
                options: [
                    { text: 'Always', score: 0 },
                    { text: 'Usually', score: 1 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Never', score: 3 }
                ]
            },
            {
                id: 'cd_perf_7',
                text: 'How often does the child take responsibility for their actions?',
                subcategory: 'Conduct Disorder',
                type: 'performance',
                options: [
                    { text: 'Always', score: 0 },
                    { text: 'Usually', score: 1 },
                    { text: 'Sometimes', score: 2 },
                    { text: 'Never', score: 3 }
                ]
            }
        ]
    }
]; 