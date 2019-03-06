# monitoro-service

It is a service that keeps an eye on your service for safety.

## Backend

- [x] Init GraphQL
- [x] Entities
- [x] shared Type

### User

- [x] SignIn

### Project

- [x] GetProjects
- [x] CreateProject
- [ ] ModifyProject
- [ ] RemoveProject (with Message, Tag)
- [ ] InviteUser
- [ ] AddParticipants
- [ ] GetParticipants

### Message

- [ ] GetMessages
- [ ] SendMessage
- [ ] SendMessageSubscription
- [ ] DeleteMessages (use id, use Tag)

### Tag

- [ ] GetTags
- [ ] AddTag
- [ ] ModifyTag
- [ ] ModifyTagSubscription
- [ ] DeleteTag ( with Messages )

### ETC

- [ ] SendMail for InviteUser
