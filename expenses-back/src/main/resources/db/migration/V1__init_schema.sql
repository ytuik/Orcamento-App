CREATE TABLE IF NOT EXISTS account (
    id              BIGSERIAL PRIMARY KEY,
    name            VARCHAR(255)             NOT NULL,
    initial_balance DOUBLE PRECISION         NOT NULL,
    is_active       BOOLEAN                  NOT NULL DEFAULT TRUE,
    color           VARCHAR(255),
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at      TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS category (
    id           BIGSERIAL PRIMARY KEY,
    name         VARCHAR(255)     NOT NULL,
    icon_key     VARCHAR(255)     NOT NULL,
    color        VARCHAR(255)     NOT NULL,
    type         INTEGER          NOT NULL,
    is_system    BOOLEAN          NOT NULL DEFAULT FALSE,
    is_active    BOOLEAN          NOT NULL DEFAULT TRUE,
    budget_limit DOUBLE PRECISION
);

CREATE TABLE IF NOT EXISTS transaction (
    id                 BIGSERIAL PRIMARY KEY,
    account_id         BIGINT           NOT NULL REFERENCES account (id),
    transaction_amount DOUBLE PRECISION NOT NULL,
    transaction_type   INTEGER          NOT NULL,
    transaction_date   DATE             NOT NULL,
    category_id        BIGINT           REFERENCES category (id),
    description        TEXT             NOT NULL,
    comment            VARCHAR(255),
    created_at         TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at         TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS transfer (
    id                     BIGSERIAL PRIMARY KEY,
    origin_account_id      BIGINT           NOT NULL REFERENCES account (id),
    destination_account_id BIGINT           NOT NULL REFERENCES account (id),
    amount                 DOUBLE PRECISION NOT NULL,
    transfer_date          DATE             NOT NULL,
    description            VARCHAR(255)
);
