import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export default function HomePage() {
  return (
    <div className="m-auto justify-center w-full max-w-[80%]">
      <Card className="w-full flex-row" placeholder={undefined}>
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
          placeholder={undefined}
        >
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody placeholder={undefined}>
          <Typography
            variant="h6"
            color="gray"
            className="mb-4 uppercase"
            placeholder={undefined}
          >
            Wellcome
          </Typography>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
          >
            Dexa Workforce Management Application For Employee
          </Typography>
          <Typography
            color="gray"
            className="mb-8 font-normal"
            placeholder={undefined}
          >
            Like so many organizations these days, Autodesk is a company in
            transition. It was until recently a traditional boxed software
            company selling licenses. Yet its own business model disruption is
            only part of the story
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}
