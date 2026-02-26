# Documentation des modifications par cas d'utilisation

## Cas 1 — Inscriptions (anonymat + clauses de consentement photo)

### Fichiers modifiés
- `migrations/2026-02-26_add_anonymat_et_clauses_photo.sql`
- `front/src/types/sign-up/team-member.ts`
- `front/src/pages/ParticipantRegistration/ParticipantRegistrationPage.tsx`
- `front/src/components/signup/team-member.tsx`
- `backend/api/src/Validators/ValidatorTeam.php`
- `backend/api/src/Repositories/SignUpTeamRepository.php`

### Résumé
- Ajout d'une migration SQL pour supporter `is_anonymous` et `photo_consent_clause` dans `users`.
- Ajout des champs côté front dans le type `TeamMember`.
- Ajout des champs au formulaire d'inscription participant (sélection de clause + anonymat).
- Validation backend des nouvelles informations.
- Persistance backend des nouvelles informations lors de la création des membres.

## Cas 2 — Réinitialisation de fin d'évènement + renommage de l'onglet

### Fichiers modifiés
- `backend/api/src/Actions/Administrators/PostResetEventDataAction.php`
- `backend/api/src/Services/UserService.php`
- `backend/api/src/Repositories/UserRepository.php`
- `backend/api/config/routes.php`
- `front/src/api/users/userService.ts`
- `front/src/pages/AdministratorsList/AdministratorsListPage.tsx`
- `front/src/types/AdministrationMainPage/AdministrationMainPageTabs.ts`
- `front/src/lang/fr.ts`

### Résumé
- Ajout d'une route API admin pour lancer la réinitialisation annuelle.
- Ajout d'une méthode service/référentiel backend pour vider les données évènementielles.
- Ajout d'un bouton dans la page administrateurs pour déclencher la réinitialisation.
- Renommage de l'onglet « Administrateurs » en « Paramètres généraux ».
