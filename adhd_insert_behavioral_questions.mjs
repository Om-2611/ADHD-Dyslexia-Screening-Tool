console.log('Script started');
const { addQuestion, DEFAULT_BEHAVIORAL_OPTIONS } = await import('./src/services/firebase.js');
console.log('addQuestion function:', addQuestion);

const questions = [
  // Predominantly Inattentive (1-9)
  { text: "Does not pay attention to details or makes careless mistakes, such as in homework", subcategory: 'predominantly_inattentive' },
  { text: "Has difficulty sustaining attention to tasks or activities", subcategory: 'predominantly_inattentive' },
  { text: "Does not seem to listen when spoken to directly", subcategory: 'predominantly_inattentive' },
  { text: "Does not follow through on instruction and fails to finish schoolwork (not due to oppositional behavior or failure to understand)", subcategory: 'predominantly_inattentive' },
  { text: "Has difficulty organizing tasks and activities", subcategory: 'predominantly_inattentive' },
  { text: "Avoids, dislikes, or is reluctant to engage in tasks that require sustained mental effort", subcategory: 'predominantly_inattentive' },
  { text: "Loses things necessary for tasks or activities (school assignments, pencils, or books)", subcategory: 'predominantly_inattentive' },
  { text: "Is easily distracted by extraneous stimuli", subcategory: 'predominantly_inattentive' },
  { text: "Is forgetful in daily activities", subcategory: 'predominantly_inattentive' },

  // Predominantly Hyperactive-Impulsive (10-18)
  { text: "Fidgets with hands or feet or squirms in seat", subcategory: 'predominantly_hyperactive' },
  { text: "Leaves seat when remaining seated is expected", subcategory: 'predominantly_hyperactive' },
  { text: "Runs about or climbs excessively in situations when remaining seated is expected", subcategory: 'predominantly_hyperactive' },
  { text: "Has difficulty playing or engaging in leisure activities quietly", subcategory: 'predominantly_hyperactive' },
  { text: 'Is "on the go" or often acts as if "driven by a motor"', subcategory: 'predominantly_hyperactive' },
  { text: "Talks too much", subcategory: 'predominantly_hyperactive' },
  { text: "Blurts out answers before questions have been completed", subcategory: 'predominantly_hyperactive' },
  { text: "Has difficulty waiting his or her turn", subcategory: 'predominantly_hyperactive' },
  { text: "Interrupts or intrudes on others (butts into conversations or games)", subcategory: 'predominantly_hyperactive' },

  // ODD (19-26)
  { text: "Argues with adults", subcategory: 'oppositional_defiant_disorder' },
  { text: "Loses temper", subcategory: 'oppositional_defiant_disorder' },
  { text: "Actively defies or refuses to comply with adults' requests or rules", subcategory: 'oppositional_defiant_disorder' },
  { text: "Deliberately annoys people", subcategory: 'oppositional_defiant_disorder' },
  { text: "Blames others for his or her mistakes or misbehaviors", subcategory: 'oppositional_defiant_disorder' },
  { text: "Is touchy or easily annoyed by others", subcategory: 'oppositional_defiant_disorder' },
  { text: "Is angry or resentful", subcategory: 'oppositional_defiant_disorder' },
  { text: "Is spiteful and vindictive", subcategory: 'oppositional_defiant_disorder' },

  // Conduct Disorder (27-40)
  { text: "Bullies, threatens, or intimidates others", subcategory: 'conduct_disorder' },
  { text: "Initiates physical fights", subcategory: 'conduct_disorder' },
  { text: 'Lies to obtain goods for favors or to avoid obligations ("cons" others)', subcategory: 'conduct_disorder' },
  { text: "Is truant from school (skips school) without permission", subcategory: 'conduct_disorder' },
  { text: "Is physically cruel to people", subcategory: 'conduct_disorder' },
  { text: "Has stolen items of nontrivial value", subcategory: 'conduct_disorder' },
  { text: "Deliberately destroys others' property", subcategory: 'conduct_disorder' },
  { text: "Has used a weapon that can cause serious harm (bat, knife, brick, gun)", subcategory: 'conduct_disorder' },
  { text: "Is physically cruel to animals", subcategory: 'conduct_disorder' },
  { text: "Has deliberately set fires to cause damage", subcategory: 'conduct_disorder' },
  { text: "Has broken into someone else's home, business, or car", subcategory: 'conduct_disorder' },
  { text: "Has stayed out at night without permission", subcategory: 'conduct_disorder' },
  { text: "Has run away from home overnight", subcategory: 'conduct_disorder' },
  { text: "Has forced someone into sexual activity", subcategory: 'conduct_disorder' },

  // Anxiety Disorder (41-47)
  { text: "Is fearful, anxious, or worried", subcategory: 'anxiety_disorder' },
  { text: "Is afraid to try new things for fear of making mistakes", subcategory: 'anxiety_disorder' },
  { text: "Feels worthless or inferior", subcategory: 'anxiety_disorder' },
  { text: "Blames self for problems, feels guilty", subcategory: 'anxiety_disorder' },
  { text: 'Feels lonely, unwanted, or unloved; complains that "no one loves" him or her', subcategory: 'anxiety_disorder' },
  { text: "Is sad, unhappy, or depressed", subcategory: 'anxiety_disorder' },
  { text: "Is self-conscious or easily embarrassed", subcategory: 'anxiety_disorder' },
];

for (const q of questions) {
  await addQuestion({
    text: q.text,
    category: 'adhd',
    subcategory: q.subcategory,
    questionType: 'behavioral',
    options: DEFAULT_BEHAVIORAL_OPTIONS,
  });
  console.log(`Inserted: ${q.text}`);
}
console.log('All ADHD behavioral questions inserted.'); 