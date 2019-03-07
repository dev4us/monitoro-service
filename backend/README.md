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

- [x] GetMessages
- [x] SendMessage
- [x] SendMessageSubscription
- [ ] DeleteMessages (use id, use Tag)

### Tag

- [ ] GetTags
- [x] AddTag
- [ ] ModifyTag
- [ ] ModifyTagSubscription
- [ ] DeleteTag ( with Messages )

### ETC

- [ ] SendMail for InviteUser
