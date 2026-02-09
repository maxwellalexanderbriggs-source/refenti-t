-- Update project descriptions for Refenti Bulbula, Kazanchis, and Terraz

-- Update Refenti Bulbula description
UPDATE projects
SET description = 'An integrated mixed-use asset combining retail, hospitality, and workspace within a single urban destination.',
    updated_at = NOW()
WHERE name ILIKE '%bulbula%';

-- Update Kazanchis description
UPDATE projects
SET description = 'A large-scale mixed-use development integrating workspace, hospitality, and residential components.',
    updated_at = NOW()
WHERE name ILIKE '%kazanchis%';

-- Update Terraz description
UPDATE projects
SET description = 'A low-density residential asset designed around privacy, architectural restraint, and long-term livability.',
    updated_at = NOW()
WHERE name ILIKE '%terraz%';
