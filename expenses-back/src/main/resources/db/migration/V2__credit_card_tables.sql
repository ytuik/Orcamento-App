CREATE TABLE IF NOT EXISTS credit_card (
    id            BIGSERIAL PRIMARY KEY,
    name          VARCHAR(255)             NOT NULL,
    color         VARCHAR(255)             NOT NULL,
    icon_key      VARCHAR(255)             NOT NULL,
    credit_limit  DOUBLE PRECISION         NOT NULL,
    closing_day   INTEGER                  NOT NULL,
    due_date      INTEGER                  NOT NULL,
    is_active     BOOLEAN                  NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS credit_card_transaction (
    id                      BIGSERIAL PRIMARY KEY,
    credit_card_id          BIGINT           NOT NULL REFERENCES credit_card (id),
    description             TEXT             NOT NULL,
    establishment           VARCHAR(255)     NOT NULL,
    total_amount            DOUBLE PRECISION NOT NULL,
    category_id             BIGINT           REFERENCES category (id),
    transaction_date        DATE             NOT NULL,
    number_of_installments  INTEGER          NOT NULL DEFAULT 1,
    is_active               BOOLEAN          NOT NULL DEFAULT TRUE,
    created_at              TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS credit_card_installment (
    id                        BIGSERIAL PRIMARY KEY,
    credit_card_transaction_id BIGINT           NOT NULL REFERENCES credit_card_transaction (id),
    installment_number        INTEGER          NOT NULL,
    amount                    DOUBLE PRECISION NOT NULL,
    billing_year              INTEGER          NOT NULL,
    billing_month             INTEGER          NOT NULL,
    status                    INTEGER          NOT NULL DEFAULT 1,
    paid_at                   DATE
);
