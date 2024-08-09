# Senior Fullstack developer assignment for GoHealth

This is my take on the assignment. A lot of things could be done differently, obviously. I experimented with SSE to stream data from the CSV file to frontend line by line as messages in case the CSV gets too big. This could be further improved to handle updates, inserts from multiple users and so on. I took a minimal approach with it by not including any unnecessary libraries that would be overkill for a project of this size. Eg. UI library like Boostrap, Formik or so for forms, Zod for validation.

On the backend side, there are still couple of issues like missing validation. But mainly in case of multiple updates, while the previous update is still going on, will lead to lost data or unhalded errors. I consider this to be outside of the scope of this assignment due to lack of time.

The frontend side is pretty solid. Some refactoring could be done to further simplify and tidy up the main page controller. UX and design could be obviously improved significantly. There are missing loading states, form validation and error handling. Again due to lack of time I was able to spend on this assignment.

## Run the project

You will need running docker on your system. Clone the repository and from inside run following commands

```
docker build -t gohealth-assignment .
```

```
docker run -p 3000:3000 gohealth-assignment
```

You should be able to see the application on your [localhost:3000](http://localhost:3000)
