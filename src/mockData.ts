import type { SkillLevel, SkillName, ResumeClaim, JobRecommendation, ImprovementWeek } from './types';

export interface CareerCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  accent: string;
  roles: { id: string; title: string; description: string }[];
}

export const CAREER_CATEGORIES: CareerCategory[] = [
  {
    id: 'software',
    title: 'Software Development',
    description: 'Build apps, APIs, and systems with code.',
    icon: 'Code2',
    accent: 'ember',
    roles: [
      { id: 'swe', title: 'Software Engineer', description: 'Full-stack application development' },
      { id: 'frontend', title: 'Frontend Developer', description: 'UI and client-side engineering' },
      { id: 'backend', title: 'Backend Developer', description: 'Server, API, and database engineering' },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    description: 'Turn raw data into decisions.',
    icon: 'BarChart3',
    accent: 'crimson',
    roles: [
      { id: 'data-analyst', title: 'Data Analyst', description: 'Analyze data to find insights' },
      { id: 'bi-analyst', title: 'BI Analyst', description: 'Build dashboards and reports' },
      { id: 'data-scientist', title: 'Data Scientist', description: 'Statistical modeling & ML' },
    ],
  },
  {
    id: 'business-analytics',
    title: 'Business Analytics',
    description: 'Bridge data and business strategy.',
    icon: 'TrendingUp',
    accent: 'ember',
    roles: [
      { id: 'business-analyst', title: 'Business Analyst', description: 'Drive process & strategy decisions' },
      { id: 'product-analyst', title: 'Product Analyst', description: 'Analyze product metrics & growth' },
      { id: 'ops-analyst', title: 'Operations Analyst', description: 'Optimize business operations' },
    ],
  },
  {
    id: 'uiux',
    title: 'UI/UX Design',
    description: 'Design beautiful, usable products.',
    icon: 'PenTool',
    accent: 'crimson',
    roles: [
      { id: 'ux-designer', title: 'UX Designer', description: 'Research and design user flows' },
      { id: 'ui-designer', title: 'UI Designer', description: 'Design visual interfaces' },
      { id: 'product-designer', title: 'Product Designer', description: 'End-to-end product design' },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Grow brands and audiences online.',
    icon: 'Megaphone',
    accent: 'ember',
    roles: [
      { id: 'seo-specialist', title: 'SEO Specialist', description: 'Optimize search visibility' },
      { id: 'social-media', title: 'Social Media Manager', description: 'Manage campaigns & content' },
      { id: 'growth-marketer', title: 'Growth Marketer', description: 'Drive acquisition & retention' },
    ],
  },
  {
    id: 'finance',
    title: 'Finance',
    description: 'Analyze markets, budgets, and risk.',
    icon: 'DollarSign',
    accent: 'crimson',
    roles: [
      { id: 'financial-analyst', title: 'Financial Analyst', description: 'Analyze financial performance' },
      { id: 'investment-analyst', title: 'Investment Analyst', description: 'Evaluate investment opportunities' },
      { id: 'risk-analyst', title: 'Risk Analyst', description: 'Assess and mitigate risk' },
    ],
  },
  {
    id: 'hr',
    title: 'Human Resources',
    description: 'Build and support great teams.',
    icon: 'Users',
    accent: 'ember',
    roles: [
      { id: 'hr-generalist', title: 'HR Generalist', description: 'Manage the full employee lifecycle' },
      { id: 'recruiter', title: 'Technical Recruiter', description: 'Source and hire talent' },
      { id: 'people-ops', title: 'People Operations', description: 'Optimize people processes' },
    ],
  },
];

export const ASSESSABLE_SKILLS: SkillName[] = ['Python', 'SQL', 'Power BI', 'Excel', 'JavaScript'];

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const ASSESSMENT_QUESTIONS: Record<SkillName, AssessmentQuestion[]> = {
  Python: [
    { id: 1, question: 'What is the output of: print(type([]))?', options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'dict'>"], correctIndex: 0, explanation: 'Square brackets create a list object.' },
    { id: 2, question: 'Which keyword defines a function in Python?', options: ['func', 'def', 'function', 'lambda'], correctIndex: 1, explanation: 'def is used to define named functions.' },
    { id: 3, question: 'What does len("hello") return?', options: ['4', '5', '6', 'Error'], correctIndex: 1, explanation: 'len() returns the number of characters.' },
    { id: 4, question: 'Which of these is an immutable data type?', options: ['list', 'dict', 'tuple', 'set'], correctIndex: 2, explanation: 'Tuples are immutable once created.' },
    { id: 5, question: 'What is list comprehension syntax for squares of 0-4?', options: ['[x^2 for x in range(5)]', '[x**2 for x in range(5)]', '[x*x in range(5)]', 'map(x**2, range(5))'], correctIndex: 1, explanation: '** is the power operator in Python.' },
    { id: 6, question: 'What does the "with" statement do when opening a file?', options: ['Caches the file', 'Ensures the file is properly closed', 'Encrypts the file', 'Locks the file'], correctIndex: 1, explanation: 'with provides context management for resource cleanup.' },
    { id: 7, question: 'How do you handle a division by zero gracefully?', options: ['if-check before dividing', 'try/except ZeroDivisionError', 'Use math.safe_div', 'It is not possible'], correctIndex: 1, explanation: 'try/except catches the exception at runtime.' },
    { id: 8, question: 'What is a decorator in Python?', options: ['A class attribute', 'A function that wraps another function', 'A type of loop', 'A built-in module'], correctIndex: 1, explanation: 'Decorators modify behavior of functions.' },
    { id: 9, question: 'What does map(lambda x: x*2, [1,2,3]) return?', options: ['[1,2,3]', '[2,4,6]', 'A map object', 'Error'], correctIndex: 2, explanation: 'map() returns a map object (lazy iterator).' },
    { id: 10, question: 'Which pattern avoids circular imports in large codebases?', options: ['Import everything at top', 'Use local imports inside functions', 'Never use modules', 'Use global variables'], correctIndex: 1, explanation: 'Local imports break circular dependency chains.' },
  ],
  SQL: [
    { id: 1, question: 'Which keyword retrieves data from a database?', options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'], correctIndex: 1, explanation: 'SELECT retrieves rows from tables.' },
    { id: 2, question: 'What does WHERE do in a query?', options: ['Sorts results', 'Filters rows', 'Joins tables', 'Groups data'], correctIndex: 1, explanation: 'WHERE filters rows before grouping.' },
    { id: 3, question: 'Which clause groups rows with the same values?', options: ['ORDER BY', 'GROUP BY', 'HAVING BY', 'DISTINCT BY'], correctIndex: 1, explanation: 'GROUP BY aggregates rows by column values.' },
    { id: 4, question: 'What is the difference between INNER JOIN and LEFT JOIN?', options: ['No difference', 'LEFT JOIN keeps unmatched left rows', 'INNER JOIN keeps all rows', 'LEFT JOIN is faster'], correctIndex: 1, explanation: 'LEFT JOIN preserves all rows from the left table.' },
    { id: 5, question: 'What does COUNT(DISTINCT column) return?', options: ['Total rows', 'Number of unique values', 'Sum of values', 'Average value'], correctIndex: 1, explanation: 'DISTINCT counts unique non-null values.' },
    { id: 6, question: 'Which window function ranks rows without gaps?', options: ['ROW_NUMBER()', 'RANK()', 'DENSE_RANK()', 'NTILE()'], correctIndex: 2, explanation: 'DENSE_RANK() produces consecutive ranks without gaps.' },
    { id: 7, question: 'What does a CTE (WITH clause) help with?', options: ['Performance only', 'Readability and recursion', 'Security', 'Indexing'], correctIndex: 1, explanation: 'CTEs improve readability and enable recursive queries.' },
    { id: 8, question: 'How do you find the 2nd highest salary?', options: ['ORDER BY salary DESC LIMIT 1', 'Use a subquery with MAX where salary < MAX(salary)', 'SELECT salary = 2', 'GROUP BY salary DESC'], correctIndex: 1, explanation: 'Subquery with MAX excludes the top to find 2nd.' },
    { id: 9, question: 'What is a correlated subquery?', options: ['A query that references the outer query', 'A query with no joins', 'A recursive CTE', 'A UNION query'], correctIndex: 0, explanation: 'Correlated subqueries reference the outer query row.' },
    { id: 10, question: 'Which normal form eliminates transitive dependencies?', options: ['1NF', '2NF', '3NF', '4NF'], correctIndex: 2, explanation: '3NF removes transitive dependencies on non-key attributes.' },
  ],
  'Power BI': [
    { id: 1, question: 'What is a visual in Power BI?', options: ['A data source', 'A chart or graphic on a report', 'A query', 'A dashboard filter'], correctIndex: 1, explanation: 'Visuals are charts/graphics on report pages.' },
    { id: 2, question: 'Which view lets you build data models and relationships?', options: ['Report View', 'Data View', 'Model View', 'Table View'], correctIndex: 2, explanation: 'Model View manages table relationships.' },
    { id: 3, question: 'What does Power Query do?', options: ['Creates visuals', 'Transforms and cleans data', 'Publishes reports', 'Manages permissions'], correctIndex: 1, explanation: 'Power Query is the data transformation engine.' },
    { id: 4, question: 'What is DAX?', options: ['A visualization type', 'A formula language for calculations', 'A data connector', 'A dashboard theme'], correctIndex: 1, explanation: 'DAX is the Data Analysis Expressions formula language.' },
    { id: 5, question: 'Which DAX function calculates a running total?', options: ['SUM()', 'TOTALYTD()', 'COUNT()', 'AVERAGE()'], correctIndex: 1, explanation: 'TOTALYTD() computes year-to-date totals.' },
    { id: 6, question: 'What is the difference between Import and DirectQuery mode?', options: ['No difference', 'Import caches data in memory; DirectQuery queries at runtime', 'Import is read-only', 'DirectQuery is faster always'], correctIndex: 1, explanation: 'Import loads data into memory; DirectQuery hits the source live.' },
    { id: 7, question: 'What does a relationship in the model do?', options: ['Colors visuals', 'Connects tables via keys for filtering', 'Imports data', 'Exports reports'], correctIndex: 1, explanation: 'Relationships connect tables for cross-filtering.' },
    { id: 8, question: 'Which feature creates a calculated column?', options: ['New Measure', 'New Column', 'New Table', 'New Parameter'], correctIndex: 1, explanation: 'New Column creates row-level calculated columns.' },
    { id: 9, question: 'What is the purpose of a slicer?', options: ['Cuts data permanently', 'Provides interactive filtering on a report', 'Joins tables', 'Refreshes data'], correctIndex: 1, explanation: 'Slicers are interactive filter controls.' },
    { id: 10, question: 'How do you make a measure respond to row context in a visual?', options: ['Use CALCULATE()', 'Use FORMAT()', 'Use SORT()', 'Use SELECT()'], correctIndex: 0, explanation: 'CALCULATE() modifies filter context for measures.' },
  ],
  Excel: [
    { id: 1, question: 'Which function sums values with a condition?', options: ['SUM()', 'SUMIF()', 'TOTAL()', 'ADDIF()'], correctIndex: 1, explanation: 'SUMIF() sums cells meeting a criterion.' },
    { id: 2, question: 'What does VLOOKUP do?', options: ['Sorts vertically', 'Looks up a value in a column and returns a related value', 'Validates data', 'Creates a chart'], correctIndex: 1, explanation: 'VLOOKUP searches the first column and returns a value from another column.' },
    { id: 3, question: 'What is a PivotTable used for?', options: ['Formatting cells', 'Summarizing and analyzing data', 'Protecting sheets', 'Printing'], correctIndex: 1, explanation: 'PivotTables aggregate and summarize data dynamically.' },
    { id: 4, question: 'Which feature creates conditional formatting?', options: ['Home > Conditional Formatting', 'Data > Sort', 'Insert > Chart', 'Page Layout > Theme'], correctIndex: 0, explanation: 'Conditional Formatting is on the Home tab.' },
    { id: 5, question: 'What does INDEX/MATCH do better than VLOOKUP?', options: ['Looks left and is more flexible', 'Is faster always', 'Sorts data', 'Adds charts'], correctIndex: 0, explanation: 'INDEX/MATCH can look left and is more robust.' },
    { id: 6, question: 'What is an absolute reference?', options: ['A1', '$A$1', 'A1:A10', '#REF'], correctIndex: 1, explanation: '$ signs lock the reference when copied.' },
    { id: 7, question: 'Which feature removes duplicate rows?', options: ['Data > Remove Duplicates', 'Home > Delete', 'Sort & Filter', 'Find & Replace'], correctIndex: 0, explanation: 'Remove Duplicates is on the Data tab.' },
    { id: 8, question: 'What does XLOOKUP improve over VLOOKUP?', options: ['Can search in any direction and has a default not-found value', 'Is the only one that works', 'Replaces PivotTables', 'Is automatic'], correctIndex: 0, explanation: 'XLOOKUP is flexible and handles errors natively.' },
    { id: 9, question: 'What is a data validation list used for?', options: ['Creating dropdowns and restricting input', 'Sorting data', 'Protecting a workbook', 'Adding formulas'], correctIndex: 0, explanation: 'Data validation creates controlled dropdowns.' },
    { id: 10, question: 'Which formula counts non-empty cells?', options: ['COUNT()', 'COUNTA()', 'COUNTBLANK()', 'COUNTIF()'], correctIndex: 1, explanation: 'COUNTA() counts non-blank cells.' },
  ],
  JavaScript: [
    { id: 1, question: 'What does "===" check in JavaScript?', options: ['Value only', 'Value and type', 'Reference only', 'Type only'], correctIndex: 1, explanation: '=== is strict equality (value + type).' },
    { id: 2, question: 'What is the output of: typeof null?', options: ['"null"', '"undefined"', '"object"', '"number"'], correctIndex: 2, explanation: 'typeof null returns "object" (a historical bug).' },
    { id: 3, question: 'Which method adds an element to the end of an array?', options: ['push()', 'pop()', 'shift()', 'unshift()'], correctIndex: 0, explanation: 'push() appends to the end.' },
    { id: 4, question: 'What does map() return?', options: ['The original array', 'A new array', 'A boolean', 'undefined'], correctIndex: 1, explanation: 'map() returns a new transformed array.' },
    { id: 5, question: 'What is a closure?', options: ['A locked variable', 'A function with access to its outer scope', 'A type of loop', 'A class instance'], correctIndex: 1, explanation: 'Closures retain access to enclosing scope.' },
    { id: 6, question: 'What does async/await help avoid?', options: ['Type errors', 'Callback hell / promise chaining', 'Memory leaks', 'Infinite loops'], correctIndex: 1, explanation: 'async/await makes async code read synchronously.' },
    { id: 7, question: 'What is the event loop?', options: ['A DOM event listener', 'The mechanism handling async callbacks', 'A loop over array events', 'A type of iterator'], correctIndex: 1, explanation: 'The event loop processes the callback queue.' },
    { id: 8, question: 'What does "let" provide over "var"?', options: ['Block scope', 'Global scope', 'Faster execution', 'Type safety'], correctIndex: 0, explanation: 'let is block-scoped; var is function-scoped.' },
    { id: 9, question: 'How do you deep clone an object safely?', options: ['Object.assign()', 'structuredClone()', 'Spread operator', 'JSON.parse() only'], correctIndex: 1, explanation: 'structuredClone() handles nested structures and dates.' },
    { id: 10, question: 'What is a higher-order function?', options: ['A function that returns a Promise', 'A function that takes or returns functions', 'A class method', 'A recursive function'], correctIndex: 1, explanation: 'Higher-order functions accept or return functions.' },
  ],
};

export const DEFAULT_RESUME_CLAIMS: ResumeClaim[] = [
  { skill: 'Python', claimedLevel: 'Advanced' },
  { skill: 'SQL', claimedLevel: 'Advanced' },
  { skill: 'Power BI', claimedLevel: 'Intermediate' },
  { skill: 'Excel', claimedLevel: 'Intermediate' },
];

export const SAMPLE_JOB_DESCRIPTION = `Junior Data Analyst — Acme Corp

We are looking for a Junior Data Analyst to join our analytics team.

Required skills:
- Python (Intermediate)
- SQL (Intermediate)
- Power BI (Job Ready)
- Excel (Intermediate)
- Communication (Job Ready)
- Data Visualization (Intermediate)

Responsibilities:
- Clean and analyze datasets
- Build dashboards in Power BI
- Present findings to stakeholders
- Support business decisions with data`;

export const JOB_RECOMMENDATIONS: JobRecommendation[] = [
  {
    id: 'j1',
    title: 'Junior Data Analyst',
    company: 'Acme Analytics',
    location: 'Remote',
    matchPercent: 87,
    matchingSkills: ['Python', 'SQL', 'Excel'],
    missingSkills: ['Power BI'],
    salary: '$65K–$75K',
    posted: '2 days ago',
    readiness: 'Good match — apply while improving',
  },
  {
    id: 'j2',
    title: 'Reporting Analyst',
    company: 'BrightData Inc.',
    location: 'New York, NY',
    matchPercent: 82,
    matchingSkills: ['SQL', 'Excel', 'Python'],
    missingSkills: ['Power BI', 'Tableau'],
    salary: '$60K–$70K',
    posted: '5 days ago',
    readiness: 'Good match — apply while improving',
  },
  {
    id: 'j3',
    title: 'Business Analyst Intern',
    company: 'GrowthLabs',
    location: 'Boston, MA',
    matchPercent: 74,
    matchingSkills: ['Excel', 'SQL'],
    missingSkills: ['Power BI', 'Communication', 'Tableau'],
    salary: '$25/hr',
    posted: '1 week ago',
    readiness: 'Improve before applying',
  },
  {
    id: 'j4',
    title: 'Data Scientist',
    company: 'NeuralWorks',
    location: 'San Francisco, CA',
    matchPercent: 42,
    matchingSkills: ['Python'],
    missingSkills: ['Machine Learning', 'Statistics', 'SQL', 'Cloud'],
    salary: '$110K–$130K',
    posted: '3 days ago',
    readiness: 'Improve before applying',
  },
];

export const IMPROVEMENT_PLAN: ImprovementWeek[] = [
  {
    week: 1,
    title: 'Power BI Fundamentals',
    focus: 'Power BI',
    tasks: ['Connect to data sources', 'Build basic visuals', 'Create a report page', 'Publish to Power BI Service'],
    completed: false,
  },
  {
    week: 2,
    title: 'Data Cleaning & Modeling',
    focus: 'Power BI',
    tasks: ['Power Query transforms', 'Star schema modeling', 'Relationships', 'DAX basics'],
    completed: false,
  },
  {
    week: 3,
    title: 'DAX Fundamentals',
    focus: 'Power BI',
    tasks: ['CALCULATE() deep dive', 'Time intelligence', 'Filter context', 'Measures vs columns'],
    completed: false,
  },
  {
    week: 4,
    title: 'Build a Dashboard Project',
    focus: 'Portfolio',
    tasks: ['End-to-end dashboard', 'Publish & share', 'Write a case study', 'Add to portfolio'],
    completed: false,
  },
];

export const SAMPLE_RESUME_TEXT = `Jane Doe
Data Analyst

SKILLS
Python — Advanced
SQL — Advanced
Power BI — Intermediate
Excel — Intermediate
Tableau — Beginner

EXPERIENCE
Data Analyst Intern, TechCorp (2024)
- Built dashboards in Power BI
- Wrote SQL queries for reporting
- Automated Excel reports with Python`;
