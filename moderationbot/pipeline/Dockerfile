FROM golang:1.24-alpine
WORKDIR /pipeline

COPY go.mod go.sum ./
RUN go mod download

COPY main.go ./
COPY rdb ./rdb

RUN CGO_ENABLED=0 GOOS=linux go build -o ./pipeline

ENTRYPOINT ["./pipeline"]