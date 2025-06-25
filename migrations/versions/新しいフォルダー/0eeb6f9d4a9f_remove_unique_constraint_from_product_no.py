"""remove unique constraint from product_no

Revision ID: 0eeb6f9d4a9f
Revises: bdd19fa63016
Create Date: 2025-06-25 00:32:05.418120
"""

from alembic import op

# revision identifiers, used by Alembic.
revision = '0eeb6f9d4a9f'
down_revision = 'bdd19fa63016'
branch_labels = None
depends_on = None


def upgrade():
    # UNIQUE制約を削除（インデックスを削除）
    op.drop_index('ix_product_number_product_no', table_name='product_number')


def downgrade():
    # 元に戻す（UNIQUEインデックスを再作成）
    op.create_index(
        'ix_product_number_product_no',
        'product_number',
        ['product_no'],
        unique=True
    )
