# Tests E2E

1. Ajouter un atelier
2. Lister les ateliers
3. Visualiser l'atelier
4. Modifier l'atelier (tous ses champs)
5. Supprimer un atelier

#### Scénario 1
Open '#/workshops' => Expect Table

#### Scénario 2
Click on link 'Ajouter' => Expect form

#### Scénario 3
Fill fields input with random values => save $title, etc.

Select options on selectors

Submit form => Expect Table with elements $title, etc.

Click on button 'Visualiser' => Expect elements with $title, etc.  

#### Scénario 4
Click on button 'Modifier' => Expect Form with fields filled with $title, etc.

Change fields with random values => save $title, etc.

Submit form => Expect Table with elements $title, etc.

Click on button 'Visualiser' => Expect elements with $title, etc.

#### Scénario 5
Click on button 'Supprimer' => save $id url

Open '#/workshops/$id' => Expect 404 error
