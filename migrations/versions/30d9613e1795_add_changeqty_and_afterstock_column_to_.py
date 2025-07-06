"""add changeQty and afterStock column to inout_log

Revision ID: 30d9613e1795
Revises: 92ca306a9053
Create Date: 2025-07-06 16:27:19.598355

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "30d9613e1795"
down_revision = "92ca306a9053"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "inout_log",
        sa.Column("change_qty", sa.Integer(), nullable=False, server_default="0"),
    )
    op.add_column(
        "inout_log",
        sa.Column("stock_after", sa.Integer(), nullable=False, server_default="0"),
    )


def downgrade():
    op.drop_column("inout_log", "change_qty")
    op.drop_column("inout_log", "stock_after")
