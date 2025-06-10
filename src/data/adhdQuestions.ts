import { QuestionCategory } from "../types/questionTypes";

export const adhdCategories: QuestionCategory[] = [
    {
        name: 'Predominantly Inattentive',
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
        name: 'Predominantly Hyperactive',
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
                text: 'Runs about or climbs excessively in situations when remaining seated is expected',
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
                text: 'Is "on the go" or acts as if "driven by a motor"',
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
                text: 'Talks excessively',
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
                text: 'Blurts out answers before questions have been completed',
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
                text: 'Has difficulty awaiting turn',
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
                text: 'Interrupts or intrudes on others (e.g., butts into conversations or games)',
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
        name: 'Oppositional Defiant Disorder',
        behavioralQuestions: [
            {
                id: 'ODD-1',
                text: 'Argues with adults',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'ODD-2',
                text: 'Loses temper',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'ODD-3',
                text: 'Actively defies or refuses to comply with adults\' requests or rules',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'ODD-4',
                text: 'Deliberately annoys people',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'ODD-5',
                text: 'Blames others for his or her mistakes or misbehaviors',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'ODD-6',
                text: 'Is touchy or easily annoyed by others',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'ODD-7',
                text: 'Is angry or resentful',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'behavioral',
                options: [
                    { text: 'Never', score: 0 },
                    { text: 'Occasionally', score: 0 },
                    { text: 'Often', score: 1 },
                    { text: 'Very Often', score: 1 },
                ],
            },
            {
                id: 'ODD-8',
                text: 'Is spiteful and vindictive',
                subcategory: 'Oppositional Defiant Disorder',
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
                id: 'ODD-Perf-1',
                text: 'Performance in Reading',
                subcategory: 'Oppositional Defiant Disorder',
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
                id: 'ODD-Perf-2',
                text: 'Performance in Mathematics',
                subcategory: 'Oppositional Defiant Disorder',
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
                id: 'ODD-Perf-3',
                text: 'Performance in Written expression',
                subcategory: 'Oppositional Defiant Disorder',
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
                id: 'ODD-Perf-4',
                text: 'Relationships with peers',
                subcategory: 'Oppositional Defiant Disorder',
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
                id: 'ODD-Perf-5',
                text: 'Following directions/rules',
                subcategory: 'Oppositional Defiant Disorder',
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
                id: 'ODD-Perf-6',
                text: 'Disrupting class',
                subcategory: 'Oppositional Defiant Disorder',
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
                id: 'ODD-Perf-7',
                text: 'Assignment completion',
                subcategory: 'Oppositional Defiant Disorder',
                type: 'performance',
                options: [
                    { text: '1- very problematic', score: 1 },
                    { text: '2- problematic', score: 1 },
                    { text: '3- below average', score: 0 },
                    { text: '4- average', score: 0 },
                    { text: '5- good', score: 0 },
                ],
            },
        ],
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
    },
    {
        name: 'Anxiety Disorder',
        behavioralQuestions: [
            {
                id: 'AD-1',
                text: 'Worries about school performance or grades',
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
    }
]; 