"""add_column

Revision ID: 9490a5a8896f
Revises: 
Create Date: 2025-11-07 14:35:37.639174

"""
from alembic import op
import sqlalchemy as sa
from datetime import timezone,timedelta,datetime


# revision identifiers, used by Alembic.
revision = '9490a5a8896f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # cellテーブル
    # op.add_column('cell', sa.Column('is_deleted', sa.Boolean(), nullable=True, server_default=sa.text('0')))
    op.add_column('cell', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('cell', sa.Column('updated_at', sa.DateTime(), nullable=True))
    op.execute("UPDATE cell SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
    op.execute("UPDATE cell SET updated_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
    # shelfテーブル
    op.add_column('shelf', sa.Column('is_deleted', sa.Boolean(), nullable=True, server_default=sa.text('0')))
    op.add_column('shelf', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('shelf', sa.Column('updated_at', sa.DateTime(), nullable=True))
    op.execute("UPDATE shelf SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
    op.execute("UPDATE shelf SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL")
    # zoneテーブル
    op.add_column('zone', sa.Column('is_deleted', sa.Boolean(), nullable=True, server_default=sa.text('0')))
    op.add_column('zone', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('zone', sa.Column('updated_at', sa.DateTime(), nullable=True))
    op.execute("UPDATE zone SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL")
    op.execute("UPDATE zone SET updated_at = CURRENT_TIMESTAMP WHERE updated_at IS NULL")


def downgrade():
    op.drop_column('cell', 'updated_at')
    op.drop_column('cell', 'created_at')
    op.drop_column('cell', 'is_deleted')

    op.drop_column('shelf', 'updated_at')
    op.drop_column('shelf', 'created_at')
    op.drop_column('shelf', 'is_deleted')

    op.drop_column('zone', 'updated_at')
    op.drop_column('zone', 'created_at')
    op.drop_column('zone', 'is_deleted')
    # ### end Alembic commands ###
